# Problem Statement

- **Application / Database Design**
    Software UML Design -> [Lucidchart](https://lucid.app/lucidchart/invitations/accept/inv_c5fecb92-6aba-4db5-a2cf-bbb834c1133a)

- **Introduction**

    Student Management System is software which is helpful for students as well as the school authorities. Our Student Management System deals with the various activities related to the students. The main objective of the project is to facilitate the interaction between students and instructors related to the presentation of projects, tasks, thesis and allows instructors to give feedback to students.

    This application will host three modules, the first for (1) administrators, the second for (2) students, and lastly for (3) instructors.

    (1) The administrator module will allow admins to manage functions related to creating accounts for students and instructors, creating course curriculums and class subjects, managing the employees and payroll. 

    (2) The student module will allow students to log into their accounts to view their coursework, submit their projects, and receive feedback from instructors.

    (3) Lastly, the instructor module is designed for instructors to log in to their accounts and check assignments submitted by their students as well as being able to give feedback.

- **10 use cases to incorporate**
    1. Login/Logout functionality 
    2. Administrators can access registration flow for faculty and students
    3. Faculty/Staff can assign students to class by name/email
    4. Instructors can grade assignments and provide feedback
    5. Instructors can add/remove students 
    6. Instructors can post announcements, discussions, and upload files.
    7. Students can submit projects (upload files)
    8. Students can work on quizzes and assignments 
    9. Students can drop/withdraw from classes 
    10. Students can view coursework/grades

### Hierarchy

**Universal**

- Login
- Logout

**Administrators**

- Register Faculty
- Register Staff

**Instructors/Faculy**

- Grade assignments
- Add/remove students
- Post announcements, discussions, and assignments

**Students**

- Submit assignments (file upload)
- Take quizzes and exams
- View coursework (grades)
- Drop/Withdraw courses
