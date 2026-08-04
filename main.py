from fastapi import FastAPI
import pandas as pd
import joblib
from pydantic import BaseModel , Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
model = joblib.load('Mental_Health_Model.pkl')


top_countries =  ['Other', 'India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France']

# base model
class StudentData(BaseModel):
    Age                     : int = Field(..., alias='age', ge=10, le=100)
    Gender                  : Literal['Male','Female'] = Field(..., alias='gender')
    Country                 : str = Field(..., alias='country')
    Academic_Level          : Literal['Undergraduate', 'Graduate', 'High School'] = Field(..., alias='academic_level')
    Most_Used_Platform      : Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter','YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp','WeChat'] = Field(..., alias='most_used_platform')
    Purpose_Of_Use          : Literal['Networking', 'Education', 'Entertainment', 'News'] = Field(..., alias='purpose_of_use')
    Avg_Daily_Usage_Hours   : float = Field(..., alias='avg_daily_usage_hours', ge=0, le=24)
    Daily_Unlocks           : int = Field(..., alias='daily_unlocks', ge=0)
    Study_Hours             : float = Field(..., alias='study_hours', ge=0, le=24)
    Physical_Activity_Hours : float = Field(..., alias='physical_activity_hours', ge=0, le=2)
    Sleep_Hours_Per_Night   : float = Field(..., alias='sleep_hours_per_night', ge=0, le=24)
    Stress_Level            : Literal['Medium', 'Low', 'Very High', 'High'] = Field(..., alias='stress_level')

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            'example': {
                'age': 21,
                'gender': 'Male',
                'country': 'India',
                'academic_level': 'Undergraduate',
                'most_used_platform': 'Instagram',
                'purpose_of_use': 'Entertainment',
                'avg_daily_usage_hours': 4.5,
                'daily_unlocks': 35,
                'study_hours': 3.0,
                'physical_activity_hours': 0.5,
                'sleep_hours_per_night': 7.0,
                'stress_level': 'Medium'
            }
        }

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"]
)



#  Describe what we send back

class PredictionResponce(BaseModel):
    predicted_mental_health_score:float
@app.get("/")
def greet():
    return {"Welcome prince"}

    
@app.post("/predict")
def predict(data :StudentData):

    country_group = data.Country if data.Country in top_countries else 'others'


    input_row = pd.DataFrame([{
    'Age' : data.Age,
    'Gender' : data.Gender,
    'Country' : data.Country,
    'Academic_Level' : data.Academic_Level,
    'Most_Used_Platform' : data.Most_Used_Platform,
    'Purpose_Of_Use' : data.Purpose_Of_Use,
    'Avg_Daily_Usage_Hours' : data.Avg_Daily_Usage_Hours,
    'Daily_Unlocks' : data.Daily_Unlocks,
    'Study_Hours' : data.Study_Hours,
    'Physical_Activity_Hours' : data.Physical_Activity_Hours,
    'Sleep_Hours_Per_Night' : data.Sleep_Hours_Per_Night,
    'Stress_Level' : data.Stress_Level,
    'Grouped_country' : country_group
    }])


    prediction = model.predict(input_row)[0]
    return PredictionResponce(predicted_mental_health_score=round(float(prediction),2))