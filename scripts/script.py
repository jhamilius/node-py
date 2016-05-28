import sys
import numpy as np
import pandas as pd
from sklearn.cross_validation import train_test_split
from sklearn.linear_model import LogisticRegression

# import data
data = pd.read_csv('scripts/titanic_train.csv')

# extract target
survived_column = data['Survived']
target = survived_column.values

# extract features
numerical_features = data.get(['Fare', 'Pclass', 'Age'])
median_features = numerical_features.dropna().median()
imputed_features = numerical_features.fillna(median_features)
features_array = imputed_features.values

# split database
features_train, features_test, target_train, target_test = train_test_split(features_array, target, test_size=0.20, random_state=0)

# fitting
logreg = LogisticRegression(C=1.)
logreg.fit(features_train, target_train)

# get array
a = int(float(sys.argv[1]))
b = int(float(sys.argv[2]))
c = int(float(sys.argv[3]))

# print prediction
print(logreg.predict([[a,b,c]]))

