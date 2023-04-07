from flask_cors import CORS
from flask import Flask, request
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import datetime
import math
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
import json
from json import JSONEncoder


app = Flask(__name__)

CORS(app)



def download_stock_csv(period1, period2, stock_name):
    href= "https://query1.finance.yahoo.com/v7/finance/download/{}?period1={}&period2={}&interval=1d&events=history&includeAdjustedClose=true".format(stock_name,period1,period2)
    return pd.read_csv(href)

def get_close_data(df):
    # Create new dataframe with only close column
    data = df.filter(['Close'])
    # Convert data frame to np array
    dataset = data.values
    return dataset

def scale_data(dataset):
    # scale data
    scaler = MinMaxScaler(feature_range=(0,1))
    scaled_data = scaler.fit_transform(dataset)
    return scaled_data, scaler

def split_into_train_test(scaled_data, train_len, pre_data):
    # split to train test
    train = scaled_data[0:train_len]
    test = scaled_data[train_len-pre_data:]
    return train, test

def split_into_x_y(data, pre_data):
    x= []
    y= []
    for i in range(pre_data, len(data)):
        x.append(data[i-pre_data:i,0])
        y.append(data[i,0])
    # convert train sets to np array
    x, y = np.array(x), np.array(y)
    return x,y

def train_linear_reg_model(x_train,y_train):
    # use linear regression to predict the price
    reg = LinearRegression().fit(x_train, y_train)
    return reg

def predict_next_thirty_days(model, scaled_data, pre_data, scaler):
    for i in range(0, 30):
        next_day_test = scaled_data[-pre_data:]
        next_day_test = next_day_test.reshape(1,pre_data)
        nextday = model.predict(next_day_test)
        nextday = nextday.reshape(nextday.shape[0],1)
        scaled_data = np.append(scaled_data, nextday.reshape(-1))
    next_thirty = scaled_data[-30:].reshape(scaled_data[-30:].shape[0],1)
    next_thirty = scaler.inverse_transform(next_thirty)
    return next_thirty

def format_result(res):
    date = []
    for i in range(1, 31):
        d = datetime.now()+timedelta(i)
        date.append(d.strftime("%d/%m/%y"))
    res['date'] = date
    return res


@app.route("/getModelResult")
def getResult():
    # get dataset from start period to now 
    # get time stamp of start date and current date
    #  get data from yahoo finance link **/
    args = request.args
    day = 12
    month = 1
    year = 2014
    start_date = '{}.{}.{}'.format(day,month,year)
    period1 = math.floor(datetime.strptime(start_date, '%d.%m.%Y').timestamp())
    yesterday = (datetime.now()-timedelta(1)).timestamp()
    period2 = math.floor(yesterday)
    stock_name = args['name']

    df  = download_stock_csv(period1, period2, stock_name)
    currentPrice = np.array(df.tail(1)['Adj Close'])[0]
    df.fillna(method='ffill', inplace=True)
    
    dataset = get_close_data(df)
    dataset_for_prediction = get_close_data(df)

    scaled_data, scaler = scale_data(dataset)
    train_len = int(df.shape[0]*1)
    pre_data = 60
    train, test = split_into_train_test(scaled_data, train_len, pre_data)

    x_train, y_train = split_into_x_y(train, pre_data)
    x_test, y_test = split_into_x_y(test, pre_data)

    model = train_linear_reg_model(x_train, y_train)
    next_thirty = predict_next_thirty_days(model, scaled_data, pre_data, scaler)
    next_thirty = next_thirty.flatten()
    res = {"price": next_thirty.tolist(),
           "currentPrice": currentPrice }
    res = format_result(res)
    return res

