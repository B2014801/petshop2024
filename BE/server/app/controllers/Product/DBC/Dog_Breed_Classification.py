import numpy as np
import pandas as pd
import sys
import os

from sklearn.preprocessing import LabelEncoder

import tensorflow as tf

from tensorflow.keras.models import load_model
import warnings
warnings.filterwarnings('ignore')
current_dir = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(os.path.join(current_dir,  'labels.csv'))
le = LabelEncoder()
le = LabelEncoder()
loaded_model = load_model(os.path.join(current_dir,  'Dog_Breed_Classification.h5')) 
df['breed'] = le.fit_transform(df['breed'])

from PIL import Image  # If not already imported

def preprocess_image(filepath):
    img = Image.open(filepath)
    img = np.array(img)
    img = tf.image.resize(img, [128, 128])
    img = tf.cast(img, tf.float32) / 255.0
    return img

new_image = preprocess_image(sys.argv[1])
new_image = np.expand_dims(new_image, axis=0)  # Add batch dimension

# Make predictions
predictions = loaded_model.predict(new_image,verbose=0)

predicted_class = np.argmax(predictions[0])

# If needed, you can use the inverse_transform method of the LabelEncoder to get the original class label
predicted_breed = le.inverse_transform([predicted_class])

print(predicted_breed[0])

