import DatabaseConnection as dbc

def insertUserData(userObj):
    # insert database statment if insert data in database
    conn, cur = dbc.getDatabaseConection()
    
    print(userObj)

    return 1