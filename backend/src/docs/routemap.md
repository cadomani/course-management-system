# Summary
- All routes begin with ```/api```  
<br />
---

# Administrator


# Instructor


# Student

## ```/user/:userId```
### _JWT Auth_
<br />

### Check authentication status
- **GET**: ```/user/:userId/heartbeat```

### Get class enrollments: ```/user/:userId/enrollments```
<br /><br />

---
## ```/user/:userId/course/:courseId```
### _JWT Auth_
<br />

### Get course assignments: 

- **GET**: ```/user/:userId/course/:courseId/assignments```
  - Retrieve all assignments
- **GET**: ```/user/:userId/course/:courseId/assignment/:assignmentId```
  - Retrieve assignment
- **POST** ```/user/:userId/course/:courseId/assignment/:assignmentId```
  - Submit assignment

### ~~Get course assessments:~~
- **GET**: ```/user/:userId/course/:courseId/assessments```
  - Retrieve all assessments
- **GET**: ```/user/:userId/course/:courseId/assessment/:assessmentId```
  - Retrieve assessment
- **POST** ```/user/:userId/course/:courseId/assessment/:assessmentId```
  - Submit assessment

### Get course announcements:
- **GET**: ```/user/:userId/course/:courseId/announcements```
  - Retrieve all announcements (w/ pagination)

### ~~Get course modules:~~
- **GET**: ```/user/:userId/course/:courseId/modules```
  - Retrieve all course modules

### Get course syllabus: 
- **GET**: ```/user/:userId/course/:courseId/syllabus```
  - Retrieve syllabus

### Get course chat: 
- **GET**: ```/user/:userId/course/:courseId/chat```
  - Retrieve course chat
    - _Param_: ```?with=:userId```
      - Private chat with another classmate

