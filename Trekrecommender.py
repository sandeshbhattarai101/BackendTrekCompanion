#!/usr/bin/env python
# coding: utf-8

# In[4]:


import numpy as np
import pandas as pd


# In[5]:


destinations = pd.read_csv("Trek Data.csv")


# In[6]:


destinations = destinations[['Trek', 'Cost', 'Time', 'TripGrade', 'MaxAltitude', 'BestTravelTime']]


# In[7]:


destinations.isnull().sum()


# In[8]:


destinations.duplicated().sum()


# In[9]:


destinations.iloc[0].Cost


# In[10]:


destinations['Cost'] = destinations['Cost'].apply(lambda x:x.split())


# In[11]:


destinations['Time'] = destinations['Time'].apply(lambda x:x.split())


# In[12]:


destinations['MaxAltitude'] = destinations['MaxAltitude'].apply(lambda x:x.split())


# In[13]:


destinations['TripGrade'] = destinations['TripGrade'].apply(lambda x:x.split())


# In[14]:


destinations['BestTravelTime'] = destinations['BestTravelTime'].apply(lambda x:x.split())


# In[15]:


destinations['tags']= destinations['Cost'] + destinations['Time'] + destinations['TripGrade'] + destinations['MaxAltitude'] + destinations['BestTravelTime']


# In[16]:


new_df = destinations[['Trek', 'tags']]


# In[17]:


new_df['tags'] = new_df['tags'].apply(lambda x:" ".join(x))


# In[18]:


new_df['tags'] = new_df['tags'].apply(lambda x:x.lower())


# In[19]:


from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=1000, stop_words='english')


# In[20]:


vectors = cv.fit_transform(new_df['tags']).toarray()


# In[21]:


cv.get_feature_names_out()


# In[22]:


from sklearn.metrics.pairwise import cosine_similarity


# In[23]:


similarity = cosine_similarity(vectors)


# In[24]:


sorted(list(enumerate(similarity[0])),reverse=True,key=lambda x:x[1])[1:6]


# In[25]:


import sys

def recommend(destination):
    destination_index = new_df[new_df['Trek'] == destination].index[0]
    distances = similarity[destination_index]
    destinations_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]
    
    for i in destinations_list:
     print(new_df.iloc[i[0]].Trek)


# In[26]:


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python trekrecommender.py <destination>")
        sys.exit(1)

    destination = sys.argv[1]
    recommend(destination)

