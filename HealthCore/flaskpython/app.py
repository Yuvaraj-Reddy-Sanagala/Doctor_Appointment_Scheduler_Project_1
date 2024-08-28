from flask import Flask, request
from flask_cors import CORS
from flask_mysql_connector import MySQL
import os

from python import DatabaseConnection as dbc


app = Flask(__name__)
CORS(app, support_credentials=True)

# read database configuration from .evn file 
token = os.getenv("ACCESS_TOKEN")
db_host = os.getenv("DB_HOST")
repo_db = os.getenv("DB_DATABASE")
db_user = os.getenv("DB_USER")
pass_word = os.getenv("DB_PASSWORD")


app.config['MYSQL_HOST'] = db_host
app.config['MYSQL_DATABASE'] = repo_db
app.config['MYSQL_USER'] = db_user
app.config['MYSQL_PASSWORD'] = pass_word

mysql_connect = MySQL(app)

# Backend route 
@app.route('/')
def hello():
    return 'Welcome to Flask python backend..!'


    

@app.route("/getSpecialists", methods=['POST'])
def get_Doctorspes():

    val=request.json
    print(val)
    var=[val['Cons']]

    _, curr1 = dbc.getDatabaseConection()
    query1 = """SELECT Distinct Spe_Type, Spe_ID FROM specialist \
    JOIN Specialists_in_hospital \
    USING(Spe_ID) \
    JOIN Doctor \
    USING(ID)
    WHERE Doc_Consulting=%s OR Doc_Consulting="Both";"""        
    curr1.execute(query1,var)
    res1 = curr1.fetchall()


    Specialist = []

    for item in res1:
        Specialist.append({
            'Spe_Type' :item[0],
            'Spe_ID'   :item[1]
        })
    print(Specialist)

    return {'spe':Specialist}



@app.route("/getHospitals", methods=['POST'])
def get_hosptitals():

    val=request.json
    print(val)
    var=[val['Cons'],val['Spe']]


    _, curr = dbc.getDatabaseConection()

    query2 = """SELECT DISTINCT Hosp_name,Hosp_State,Hosp_City, Hosp_Street,Hosp_Zip_Code,Hosp_ID\
    FROM Hospital \
    JOIN Specialists_in_hospital \
    USING(Hosp_ID) \
    JOIN specialist \
    USING(Spe_ID) \
    JOIN Doctor \
    USING(ID) \
    WHERE (Doc_Consulting=%s OR Doc_Consulting="Both") AND Spe_ID=%s;"""

    curr.execute(query2,var)
    res = curr.fetchall()

    hospitals = []

    for item in res:
        hospitals.append({
            'Hosp_Name':item[0]+" ,"+item[1]+" ,"+item[2]+" ,"+item[3]+" ,"+str(item[4]),
            'Hosp_ID':item[5]
        })

    print(hospitals)


    return {'hos': hospitals}

    
@app.route("/getDoctors", methods=['POST'])
def get_docotrs():

    val=request.json
    print(val)
    var=[val['Cons'],val['Spe'],val['Hos']]

    _, curr3 = dbc.getDatabaseConection()

    query3 = """SELECT Doc_Name, Doc_ID \
    FROM DOCTOR \
    JOIN Specialists_in_hospital \
    USING(ID)   \
    JOIN Hospital \
    USING(Hosp_ID) \
    JOIN specialist \
    USING(Spe_ID) \
    WHERE (Doc_Consulting=%s OR Doc_Consulting="Both") AND Spe_ID=%s AND Hosp_ID=%s;""" 

    curr3.execute(query3,var)
    res3 = curr3.fetchall()

    Doctors = []

    for item in res3:
        Doctors.append({
            'Doc_Name' :item[0],
            'Doc_ID':item[1]
        })

    print(Doctors)


    return{'doc':Doctors}



@app.route("/personal", methods=['POST'])
def submit_details():
    val = request.json['details']

    var=[]

    for i in val:
        var.append(str(i))

    print(var)

    db, curr6 = dbc.getDatabaseConection()

    query6 = """INSERT INTO Appointment(First_Name, Last_Name, Gender, Age, Phone_Num, Email, State, City, Street, 
        Zip_Code, Consulting, App_Date, App_Time, Spe_ID, Hosp_ID,Doc_ID)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    
    curr6.execute(query6,val)
    db.commit()

    _, curr4 = dbc.getDatabaseConection()

    query4 = """SELECT App_ID,CONCAT(First_Name," ",Last_Name),Gender,Age ,Phone_Num,Email,CONCAT(Street, " ,",City," ,",State ," ,",Zip_Code),Consulting,Booking_Date,App_Date,App_Time,
        CONCAT(Hosp_Name," ,",Hosp_State," ,",Hosp_City," ,",Hosp_Street," ,",Hosp_Zip_Code) AS Hosp_Name,Spe_Type,Doc_Name
        FROM Appointment
        JOIN Hospital
        Using(Hosp_ID)
        JOIN Specialist
        USING(Spe_ID)
        JOIN Doctor
        USING(Doc_ID)
        WHERE First_Name=%s AND Last_Name=%s AND Gender=%s AND Age=%s AND Phone_Num=%s AND Email=%s AND State=%s AND City=%s AND Street=%s AND 
        Zip_Code=%s AND Consulting=%s AND App_Date=%s AND App_Time=%s AND Spe_ID=%s AND Hosp_ID=%s AND Doc_ID=%s;""" 

    curr4.execute(query4,val)
    res4 = curr4.fetchall()

    var=[]
    for i in res4[0]:
        var.append(str(i))

    print(var)

    Appointment = []

    Appointment.append({
        'App_ID' :var[0],
        'Full_Name':var[1],
        'Gender':var[2],
        'Age':var[3],
        'Phone_Num':var[4],
        'Email':var[5],
        'Address':var[6],
        'Consulting':var[7],
        'Booking_Date':var[8],
        'App_Date':var[9],
        'App_Time':var[10],
        'Hosp_Name':var[11],
        'Spe_Type':var[12],
        'Doc_Name':var[13]
        })

    print(Appointment)
    

    return Appointment




@app.route("/addcomments", methods=['POST'])
def add_comment():
    
    val = request.json['comments']
    print(val)

    db, curr7 = dbc.getDatabaseConection()


    query7 = "INSERT INTO Comments(Com) VALUES (%s)"
        
    curr7.execute(query7,(val,))
    db.commit()

    return "Inserted Succesfully"


@app.route("/getcomments", methods=['GET'])
def get_comment():

   _, curr8 = dbc.getDatabaseConection()

   query8 = "SELECT Com FROM comments ORDER BY Com_ID DESC;"
   
   curr8.execute(query8)
   res=curr8.fetchall()

   comment=[]

   for i in res:
       comment.append({'comment':i})
   
   return comment


@app.route("/getAppointments", methods=['POST'])
def get_appointments():

    val=request.json['details']
    print(val)
    _, curr4 = dbc.getDatabaseConection()

    query4 = """SELECT CAST(App_ID AS CHAR),CONCAT(First_Name," ",Last_Name),Gender,CAST(Age AS CHAR),Consulting,CAST(App_Date AS CHAR),CAST(App_Time AS CHAR),
        CONCAT(Hosp_Name," ,",Hosp_State," ,",Hosp_City," ,",Hosp_Street," ,",Hosp_Zip_Code) AS Hosp_Name,Spe_Type,Doc_Name
        FROM Appointment
        JOIN Hospital
        Using(Hosp_ID)
        JOIN Specialist
        USING(Spe_ID)
        JOIN Doctor
        USING(Doc_ID)
        WHERE First_Name=%s AND Last_Name=%s AND Phone_Num=%s
        ORDER BY App_ID DESC;""" 

    curr4.execute(query4,val)
    res4 = curr4.fetchall()


    Appointment=[]
    for i in range(len(res4)):
        var=res4[i]
        Appointment.append({
        'App_ID' :var[0],
        'Full_Name':var[1],
        'Gender':var[2],
        'Age':var[3],
        'Consultation':var[4],
        'App_Date':var[5],
        'App_Time':var[6],
        'Hosp_Name':var[7],
        'Spe_Type':var[8],
        'Doc_Name':var[9]
        })

    print(Appointment)

    
    return Appointment


@app.route("/getavailabletime", methods=['POST'])
def get_time():

    val=request.json
    print(val)
    var=[val['App_date'],val['Doc']]
    print(var)

    _, curr9 = dbc.getDatabaseConection()

    query9 = """SELECT CAST(App_Time AS CHAR) 
        FROM Appointment
        JOIN Hospital
        Using(Hosp_ID)
        JOIN Specialist
        USING(Spe_ID)
        JOIN Doctor
        USING(Doc_ID)
        WHERE App_Date=%s AND Doc_ID=%s;""" 

    curr9.execute(query9,var)
    res4 = curr9.fetchall()
    print(res4)

    time=[]
    for i in range(len(res4)):
        var1=res4[i]
        time.append({
            'time':var1[0]
        })
    print(time)
    return time


@app.route("/getpatients", methods=['POST'])
def get_patient():

    val=request.json["ID"]
    print(val)

    _, curr10 = dbc.getDatabaseConection()

    query10 = """SELECT CAST(App_ID AS CHAR),CONCAT(First_Name," ",Last_Name),Gender,CAST(Age AS CHAR),Consulting,CAST(App_Time AS CHAR)
        FROM Appointment
        JOIN Hospital
        Using(Hosp_ID)
        JOIN Specialist
        USING(Spe_ID)
        JOIN Doctor
        USING(Doc_ID)
        WHERE Doc_ID=%s AND App_Date=%s;""" 

    curr10.execute(query10,val)
    res9 = curr10.fetchall()
    print(res9)

    details=[]
    for i in range(len(res9)):
        var1=res9[i]
        details.append({
            'App_ID' :var1[0],
            'Full_Name':var1[1],
            'Gender':var1[2],
            'Age':var1[3],
            'Consulting':var1[4],
            'App_Time':var1[5]
        })

    print(details)

    return details



@app.route("/deleteappointment", methods=['POST'])
def deleted_appointment():

    val=request.json['App_ID']
    print(val)

    db, curr11 = dbc.getDatabaseConection()

    query11 = "INSERT INTO Cancellation SELECT * FROM Appointment WHERE App_ID=%s AND Phone_Num=%s;"
    curr11.execute(query11,val)
    db.commit()

    db, curr12 = dbc.getDatabaseConection()
    query12="DELETE FROM Appointment WHERE App_ID=%s AND Phone_Num=%s;"""
    curr12.execute(query12,val)
    db.commit()

    _, curr13 = dbc.getDatabaseConection()
    query13="""SELECT CAST(App_ID AS CHAR),CONCAT(First_Name," ",Last_Name),Gender,CAST(Age AS CHAR),Consulting,CAST(App_Date AS CHAR),CAST(App_Time AS CHAR),
                CONCAT(Hosp_Name," ,",Hosp_State," ,",Hosp_City," ,",Hosp_Street," ,",Hosp_Zip_Code) AS Hosp_Name,Spe_Type,Doc_Name
                FROM Cancellation
                JOIN Hospital
                Using(Hosp_ID)
                JOIN Specialist
                USING(Spe_ID)
                JOIN Doctor
                USING(Doc_ID)
                WHERE App_ID=%s AND Phone_Num=%s;"""
    curr13.execute(query13,val)
    
    res7 = curr13.fetchall()
    print(res7)

    Cancellation=[]
    for i in range(len(res7)):
        var=res7[i]
        Cancellation.append({
        'App_ID' :var[0],
        'Full_Name':var[1],
        'Gender':var[2],
        'Age':var[3],
        'Consultation':var[4],
        'App_Date':var[5],
        'App_Time':var[6],
        'Hosp_Name':var[7],
        'Spe_Type':var[8],
        'Doc_Name':var[9]
        })

    print(Cancellation)

    return Cancellation



@app.route("/selectedCit", methods=['POST'])
def selectedCit():
    val=request.json['selectedCit']
    print(val)

    _, curr5 = dbc.getDatabaseConection()

    query5 = """SELECT CONCAT(Pha_Name,' ,',Pha_Street,' ,',Cit_Name,' ,',Pha_State,' ,',Pha_Zip_Code),Pha_link
        FROM Pharmacy 
        JOIN City
        USING(Cit_ID)
        WHERE Cit_ID=%s"""

    curr5.execute(query5,(str(val),))
    res5=curr5.fetchall()

    Pharmacies=[]
    for i in res5:
        Pharmacies.append({
            "Pha_Name":i[0],
            "Pha_Link":i[1]
        })

    print(Pharmacies)

    return Pharmacies


@app.route("/getCity", methods=['GET'])
def get_pharmacies():
    _, curr2 = dbc.getDatabaseConection()

    query2 = "select Cit_ID,Cit_Name FROM City"

    curr2.execute(query2)
    res2 = curr2.fetchall()

    Cities = []

    for item in res2:
        Cities.append({
            'Cit_ID' :item[0],
            'Cit_Name':item[1]
        })
    
    print(Cities)

    return Cities






if __name__ == "__main__":
    app.run(debug=True)