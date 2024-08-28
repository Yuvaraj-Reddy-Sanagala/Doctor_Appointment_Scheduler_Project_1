import mysql.connector as connector
from mysql.connector import Error
from decouple import config
import logging

def getDatabaseConection():
    try:
        db_host = config("DB_HOST")
        repo_db = config("DB_DATABASE")
        db_user = config("DB_USER")
        pass_word = config("DB_PASSWORD")

        # connecting databases
        connection = connector.connect(
            host=db_host,
            database=repo_db,
            user=db_user,
            password=pass_word
        )
        
        if connection.is_connected():
            # creating database cursor
            print("The databse connection is requested")
            return connection, connection.cursor()
        return None
    except Error as e:
        logging.error("Error while connecting to MySQL", e)


