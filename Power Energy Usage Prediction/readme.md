### RNN Power Usage Detection
Power Usage Detection is a time series/forecasting problem. The goal is to predict power usage base on many factor that corelated to the usage (feature used in ANN). The dataset used is the Energy dataset from UCI. The dataset contains 15,788 training data and 3,947 test data. Each data divided to 10 sequences & has 33 feature, associated with scale that use robust scaler. The task is to train a model to predict a given data feature into power usage in Wh (watt per hour).

### Input Format
You have to create a deep learning model using the Keras library. The model should take 10 sequence & 33 feature as input and output a power usage value base on the input. The model should be trained on the energy UCI dataset. 
### Output Format
The output is a dictionary with the following keys:
- `train_mae`: The MAE(Mean Absolute Error [gap error between actual value & predicted value]) of the model on the training data.
- `test_mae`: The MAE(Mean Absolute Error [gap error between actual value & predicted value]) of the model on the test data.
- `train_loss`: The loss of the model on the training data.
- `test_loss`: The loss of the model on the test data.

### Example
```python
import tensorflow as tfl
from keras.layers import Dense, LSTM
from sklearn.preprocessing import RobustScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
import numpy as nmp
import pandas as pds

# Load the data
data_latih = pds.read_csv('/.../energydata_complete.csv', parse_dates=['date'], index_col='date')
data_latih['minute'] = data_latih.index.minute
data_latih['hour'] = data_latih.index.hour
data_latih['day_of_week'] = data_latih.index.dayofweek
data_latih['day_of_month'] = data_latih.index.day
data_latih['month'] = data_latih.index.month

# Reshape the data
transformer = RobustScaler()
apli_transformer = transformer.fit(train[['Appliances']])
scale_col = ['T1',	'RH_1',	'T2',	'RH_2',	'T3', 'RH_3',	'T4',	'RH_4', 'T5',	'RH_5',	'T6',	'RH_6', 'T7',	'RH_7',	'T8',	'RH_8',	'T9',	'RH_9',	'T_out',	'Press_mm_hg',	'RH_out',	'Windspeed',	'Visibility',	'Tdewpoint',	'rv1',	'rv2']
scale_transformer = transformer.fit(train[scale_col].to_numpy())

def split_data(x, y, time_steps=1):
    xs, ys = [], []
    for i in range(len(x) - time_steps):
        v = x.iloc[i:(i + time_steps)].values
        xs.append(v)
        ys.append(y.iloc[i + time_steps])
    return nmp.array(xs), nmp.array(ys)

x_train, y_train = split_data(train, train.Appliances, 10)
x_test, y_test = split_data(test, test.Appliances, 10)

# Create an instance of the model
model = Sequential()

# Add layers to the model

# Compile the model

# Train the model

# Evaluate the model
``` 

### Rules
- Implement the task in `power_energy_usage_prediction_time_series.ipynb`.
- The model should be able to handle any dataset that is in the same format as the Energy UCI dataset.
- Please do not use any pre-trained models.
- Please read the [Keras documentation](https://keras.io/) to learn how to use the Keras library.

### Style Guide
- Follow [PEP8](https://www.python.org/dev/peps/pep-0008/) style guide.
- Use docstrings to document the function.
