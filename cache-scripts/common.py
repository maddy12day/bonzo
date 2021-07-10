import sqlalchemy
from config import (DB_NAME, DB_PASSWORD, DB_USER, DB_HOSTNAME, DB_PORT)
import pandas as pd
from datetime import datetime, timedelta, date
from pymemcache.client import base
import sys

# create mysql connection with RDS
def mysql_db_conn_init():
    "mysql database connection initialization.."
    try: 
        conn = sqlalchemy.create_engine('mysql://{username}:{password}@{DB_HOSTNAME}:{PORT}/{DB_name}'.format(DB_name=DB_NAME, password=DB_PASSWORD, username=DB_USER,DB_HOSTNAME=DB_HOSTNAME, PORT=DB_PORT))
        return conn
    except Exception as e:
        print(sys.exc_info())
        
# cash connection for neo4j
def cache_connection():
    client = base.Client(('localhost', 11211))
    return client

# mysql read operation
def mysql_read_operation(SQLquery, MySQL_Conn):
    """mysql read operations"""
    try:
        df = pd.read_sql(SQLquery, MySQL_Conn)
        return df
    except Exception as e:
        print(sys.exc_info())


print(mysql_db_conn_init())