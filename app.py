from flask import Flask, render_template, request,redirect,url_for,send_file, jsonify, Response
from camera import VideoCamera
import cv2
import os
import time
import sys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'kjabsbgbfsagbfsb#'

def assure_path_exists(path):
        dir = os.path.dirname(path)
        if not os.path.exists(dir):
            os.makedirs(dir)


identity = False
done = False

@app.route('/checkIdentity')
def checkIdentity():
    return jsonify({'check':identity})

@app.route('/capturedone')
def capturedone():
    return jsonify({'done':done})



@app.route("/")
def index():
    return render_template("index.html")


def gen(camera):
        
    global face_cas
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read('trainer/trainer.yml')
    flag = 0
    id=0
    filename='filename'
    dict = {
                'item1': 1
    }
    font = cv2.FONT_HERSHEY_SIMPLEX

    while True:
        frame1 = camera.get_frame()
        gray = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
        print(gray.shape)
        faces = face_cas.detectMultiScale(gray, 1.3, 7)
        for (x,y,w,h) in faces:
            roi_gray = gray[y:y + h, x:x + w]
            cv2.rectangle(frame1, (x,y), (x+w, y+h), (255,0,0),2)
            id,conf=recognizer.predict(roi_gray)
            if(conf < 50):
                print('Face identified')
                flag = 10
                break
            cv2.putText(frame1,str(id)+" "+str(conf),(x,y-10),font,0.55,(120,255,120),1)

        if(flag == 10):
            global identity 
            identity = True
            return id

        ret, jpeg = cv2.imencode('.jpg', frame1)
        frame = jpeg.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                        mimetype='multipart/x-mixed-replace; boundary=frame')


def genFeed(camera,face_id):
    global face_cas
    count = 0
    while True:
        image_frame = camera.get_frame()

        gray = cv2.cvtColor(image_frame, cv2.COLOR_BGR2GRAY)

        faces = face_cas.detectMultiScale(gray, 1.3, 5)

        for (x,y,w,h) in faces:

            cv2.rectangle(image_frame, (x,y), (x+w,y+h), (255,0,0), 2)
            
            count += 1

            cv2.imwrite("dataset/User." + str(face_id) + '.' + str(count) + ".jpg", gray[y:y+h,x:x+w])

        if count>=30:
            print("Successfully Captured")
            import training_dataSet
            global done
            done = True
            return

        ret, jpeg = cv2.imencode('.jpg', image_frame)
        frame = jpeg.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')



@app.route("/capture/<id>",methods=['GET','POST'])
def capture(id):

    global done
    done = False
    l_list = ["kishan","mayur"]

    
    face_id=id
    
    return Response(genFeed(VideoCamera(),face_id),
                        mimetype='multipart/x-mixed-replace; boundary=frame')







@app.route("/signup",methods=["GET",'POST'])
def signup():
    global identity
    identity = False
    done = False
    return render_template("signup.html")


@app.route("/login",methods=["GET",'POST'])
def login():
    global identity
    identity = False
    return render_template("login.html")


if __name__ == "__main__":
    # global face_cas
    face_cas = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    # face_reco = cv2.face.LBPHFaceRecognizer_create()
    # face_reco.read('trainer/trainer.yml')
    assure_path_exists("dataset/")
    app.run(host="0.0.0.0",debug=True)
 
    