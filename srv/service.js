const axios = require('axios');


// function calculateAge(DateofBirth) {
//   const today = new Date();
//   const birthDate = new Date(DateofBirth);
//   let Teacherage = today.getFullYear() - birthDate.getFullYear();
//   const monthDifference = today.getMonth() - birthDate.getMonth();

//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       Teacherage--;
//   }

//   return Teacherage;
// }


    
  async function generateToken() {

  
    const tokenUrl = 'https://3e1cae61trial.authentication.us10.hana.ondemand.com/oauth/token';
    const clientId = 'sb-cf669328-c590-4369-a9f3-40cb053f89bb!b308800|xsuaa!b49390';
    const clientSecret = 'a496d0f2-821c-40ab-92c6-bf18ae2256bc$WWD6n2Sp42odnXvlmYM0inOeL8J2gn-3qundhMf7OgQ=';

  try {
      const response = await axios.post(tokenUrl, null, {
          params: {
              grant_type: 'client_credentials'
          },
          auth: {
              username: clientId,
              password: clientSecret
          }
      }); 

      const token = response.data.access_token;
      console.log('Generated Token:', token);
      return token;
  } catch (error) {
      console.error('Error generating token:', error.response ? error.response.data : error.message);
  }
}

module.exports = cds.service.impl(async function () {
  const { Department, Teacher, Sequence,Files, Student,authorisation, TeacherDetails, MYSERVICE_STUDENT_DRAFTS } = this.entities;
  this.before('CREATE', 'Files', req => {
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
})
 // Return the modified results with the calculated age

//  this.on('READ', Teacher.drafts, async (req, next) => {
//   debugger
//   if(req.data.DateofBirth){
//     var ageCal = calculateAge(req.data.DateofBirth);
//     // req.data.Age = ageCal;
//     await cds.update(Teacher.drafts).set({ Teacherage: ageCal }).where({ ttuuid: req.data.ttuuid});
// }
//   return next()
// });



//   this.after('UPDATE', Teacher, async (req) => {
//     debugger
//     // if(req.Status == 'Approved'){

//     // }
    
//         if(req.Status == 'Approved' && !req.TeacherID){
//           const { v4: uuidv4 } = require('uuid');

//           // Generate a UUID (version 4)
//           const uuid1 = uuidv4();
//           teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });

//     // If no sequence exists, initialize it
//     if (!teacherSequence) {
//        teacherSequence = { Name: 'TeacherID', Value: 0 };
//        await INSERT.into(Sequence).entries(teacherSequence);
//    }
//     // Generate new TeacherID
//     var tid = req.ttuuid;
//     const newId = teacherSequence.Value + 1;
//     req.TeacherID = `T${newId}`;
//     var childus = req.TeatoFile;
//     req.TeatoFile = null;
//     req.ttuuid = uuid1;
//     await INSERT.into(Teacher).entries(req);
//     await UPDATE(Files).set({ ttuuid: uuid1 }).where({ ttuuid: tid });
//     await DELETE.from(Teacher).where ({ttuuid:tid});
//   //  if(childus.length>0) {
//   //   await INSERT.into(Files).entries(childus[0]);
//   //  }
   
//     await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });
//   }
       
  
// });

this.before('UPDATE', Teacher, async (req) => {
  if(req.data.Status == 'Approved' && !req.data.TeacherID){

    teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });

    // If no sequence exists, initialize it
    if (!teacherSequence) {
       teacherSequence = { Name: 'TeacherID', Value: 0 };
       await INSERT.into(Sequence).entries(teacherSequence);
   }

   const newId = teacherSequence.Value + 1;
    req.data.TeacherID = `T${newId}`;

    await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });

  }
});

  // Handle CREATE operation for Department
  this.before('CREATE', 'Department', async (req) => {
    // Check if the department name already exists
    const trimmedDepartmentName = req.data.DepartmentName.trim();
    const existingDepartment = await SELECT.one.from(Department).where({ DepartmentName: trimmedDepartmentName });
    if (existingDepartment) {
      req.error(400, `The department name '${req.data.DepartmentName}' already exists with ID '${existingDepartment.DepartmentID}'.`);
    }

    // Get the current sequence value for DepartmentID
    let departmentSequence = await SELECT.one.from(Sequence).where({ Name: 'DepartmentID' });

    // If no sequence exists, initialize it
    if (!departmentSequence) {
      departmentSequence = { Name: 'DepartmentID', Value: 0 };
      await INSERT.into(Sequence).entries(departmentSequence);
    }

    // Generate new DepartmentID
    const newId = departmentSequence.Value + 1;
    req.data.DepartmentID = `D${newId}`;

    // Update the sequence value
    await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'DepartmentID' });

    const tx = cds.transaction(req);

    // Handle StudentID generation if there are students in deptToStudent
    if (req.data.deptToStudent && Array.isArray(req.data.deptToStudent) && req.data.deptToStudent.length > 0) {
      // Get the current sequence value for StudentID
      let studentSequence = await SELECT.one.from(Sequence).where({ Name: 'StudentID' });

      // If no sequence exists, initialize it
      if (!studentSequence) {
        studentSequence = { Name: 'StudentID', Value: 0 };
        await INSERT.into(Sequence).entries(studentSequence);
      }

      // Process each student
      for (const student of req.data.deptToStudent) {
        // Check if StudentID already exists in Student table
        if (student.StudentID) {
          const existingStudent = await tx.read(Student).where({ StudentID: student.StudentID });
          if (existingStudent.length > 0) {
            // StudentID exists in Student table, do not generate new ID
            continue;
          }
        }

        // Check if StudentID already exists in draft table
        if (student.StudentID) {
          const existingDraft = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ StudentID: student.StudentID });
          if (existingDraft.length > 0) {
            // StudentID exists in draft table, do not generate new ID
            continue;
          }
        }

        // Validate PhoneNumber within the same department
        if (student.PhoneNumber) {
          const existingPhoneSameDept = await tx.read(Student)
            .where({ PhoneNumber: student.PhoneNumber, DepartmentID: req.data.DepartmentID });
          if (existingPhoneSameDept.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists in the same department.`);
            return;
          }
  
          // Validate PhoneNumber across all departments
          const existingPhone = await tx.read(Student)
            .where({ PhoneNumber: student.PhoneNumber });
          if (existingPhone.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
            return;
          }
          
          // Check in the draft table as well
          const existingPhoneInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS')
            .where({ PhoneNumber: student.PhoneNumber });
          if (existingPhoneInDrafts.length > 1) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists in draft records.`);
            return;
          }
        }

        // // Validate Email
        // if (student.Email) {
        //   const existingEmail = await tx.read(Student).where({ Email: student.Email });
        //   if (existingEmail.length > 0) {
        //     req.error(409, `Email ${student.Email} already exists.`);
        //     return;
        //   }
        // }
        // Validate Email within the same department
        if (student.Email) {
          const existingEmailSameDept = await tx.read(Student)
            .where({ Email: student.Email, DepartmentID: req.data.DepartmentID });
          if (existingEmailSameDept.length > 0) {
            req.error(409, `Email ${student.Email} already exists in the same department.`);
            return;
          }

          // Validate Email across all departments
          const existingEmail = await tx.read(Student)
            .where({ Email: student.Email });
          if (existingEmail.length > 0) {
            req.error(409, `Email ${student.Email} already exists.`);
            return;
          }

          // Check in the draft table as well
          const existingEmailInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS')
            .where({ Email: student.Email });
          if (existingEmailInDrafts.length > 1) {
            req.error(409, `Email ${student.Email} already exists in draft records.`);
            return;
          }
        }

        // Generate new StudentID
        const newId = studentSequence.Value + 1;
        student.StudentID = `S${newId}`;

        // Update the sequence value
        await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'StudentID' });

        // Increment sequence for the next student
        studentSequence.Value = newId;
      }
    } else {
      console.error('deptToStudent is not in the expected format in req.data');
    }

  });

  // Handle UPDATE operation for Department
  this.before('UPDATE', 'Department', async (req) => {
    const tx = cds.transaction(req);

    // Handle StudentID generation if there are students in deptToStudent
    if (req.data.deptToStudent && Array.isArray(req.data.deptToStudent) && req.data.deptToStudent.length > 0) {
      // Get the current sequence value for StudentID
      let studentSequence = await SELECT.one.from(Sequence).where({ Name: 'StudentID' });

      // If no sequence exists, initialize it
      if (!studentSequence) {
        studentSequence = { Name: 'StudentID', Value: 0 };
        await INSERT.into(Sequence).entries(studentSequence);
      }
      debugger;
      // Process each student
      for (const student of req.data.deptToStudent) {

        // if (student.PhoneNumber) {
        //   const existingPhone = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber });
        //   if (existingPhone.length > 1) {
        //     req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
        //     return;
        //   }
        // }
        // if (student.Email) {
        //   const existingEmail = await tx.read(Student).where({ Email: student.Email });
        //   if (existingEmail.length > 1) {
        //     req.error(409, `Email ${student.Email} already exists.`);
        //     return;
        //   }
        // }
        
        // Check if StudentID already exists in Student table
        if (student.StudentID) {
          const existingStudent = await tx.read(Student).where({ StudentID: student.StudentID });
          if (existingStudent.length > 0) {
            // StudentID exists in Student table, do not generate new ID
            continue;
          }
        }

        

        // Check if StudentID already exists in draft table
        if (student.StudentID) {
          const existingDraft = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ StudentID: student.StudentID });
          if (existingDraft.length > 0) {
            // StudentID exists in draft table, do not generate new ID
            continue;
          }
        }

        if (student.PhoneNumber) {
          const existingPhone = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber });
          if (existingPhone.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
            return;
          }

          
          // Check in the draft table as well
          const existingPhoneInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS')
            .where({ PhoneNumber: student.PhoneNumber });
          if (existingPhoneInDrafts.length > 1) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists in draft records.`);
            return;
          }

        }
        
        

        // Validate Email
        if (student.Email) {
          const existingEmail = await tx.read(Student).where({ Email: student.Email });
          if (existingEmail.length > 0) {
            req.error(409, `Email ${student.Email} already exists.`);
            return;
          }
          const existingEmailInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS')
            .where({ Email: student.Email });
          if (existingEmailInDrafts.length > 1) {
            req.error(409, `Email ${student.Email} already exists in draft records.`);
            return;
          }
        }

        // Generate new StudentID
        const newId = studentSequence.Value + 1;
        student.StudentID = `S${newId}`;

        // Update the sequence value
        await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'StudentID' });

        // Increment sequence for the next student
        studentSequence.Value = newId;
      }
    } else {
      console.error('deptToStudent is not in the expected format in req.data');
    }

    
     
    const draftTeachers = await tx.read('MYSERVICE_TEACHERDETAILS_DRAFTS')
    .where({ DepartmentID: req.data.DepartmentID });

  // Create a Set to track seen TeacherID and DepartmentID combinations
  const seenTeachers = new Set();

  // Check for duplicates in the draft table
  for (const draftTeacher of draftTeachers) {
    const key = `${draftTeacher.TEACHERID}|${draftTeacher.DEPARTMENTID}`;

    if (seenTeachers.has(key)) {
      // If the combination is already seen, issue an error
      req.error(409, `Teacher ID '${draftTeacher.TEACHERID}' is already present for this department '${draftTeacher.DEPARTMENTID}'.`);
      return;
    }

    // Add the combination to the Set
    seenTeachers.add(key);
  }
    
  });

  // Handle READ operation for Department (to delete drafts with null DepartmentID)
  // this.before('READ', 'Department', async (req) => {
  //   // Delete drafts with null or empty DepartmentID and DepartmentName
  //   await DELETE.from('MYSERVICE_DEPARTMENT_DRAFTS')
  //     .where({
  //       DepartmentID: ''
  //     });
  // });

   // Handle CREATE operation for Teacher
   this.before('CREATE', 'Teacher', async (req) => {
    // Check if the teacher name already exists
    // const existingTeacher = await SELECT.one.from(Teacher).where({ Name: req.data.Name });
    // if (existingTeacher) {
    //     req.error(400, `A teacher with the name '${req.data.Name}' already exists with ID '${existingTeacher.TeacherID}'.`);
    // }

    // Check if the phone number already exists
    if (req.data.PhoneNumber) {
      const existingPhone = await SELECT.one.from(Teacher).where({ PhoneNumber: req.data.PhoneNumber });
      if (existingPhone) {
        req.error(409, `Phone number ${req.data.PhoneNumber} already exists.`);
      }
    }

    // Validate Email
    if (req.data.Email) {
      const existingEmail = await SELECT.one.from(Teacher).where({ Email: req.data.Email });
      if (existingEmail) {
        req.error(409, `Email ${req.data.Email} already exists.`);
      }
    }

    // Get the current sequence value for TeacherID
    //let teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });

    // If no sequence exists, initialize it
    //if (!teacherSequence) {
     //   teacherSequence = { Name: 'TeacherID', Value: 0 };
      //  await INSERT.into(Sequence).entries(teacherSequence);
   // }

    // Generate new TeacherID
    // const newId = teacherSequence.Value + 1;
    // req.data.TeacherID = `T${newId}`;

    // Update the sequence value
    // await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });
});

this.before('UPDATE', 'Teacher', async (req) => {
  const tx = cds.transaction(req);

  // Check if the teacher name already exists with a different ID
  // if (req.data.Name) {
  //   const existingTeacher = await SELECT.one.from(Teacher)
  //     .where({ Name: req.data.Name, TeacherID: { '!=': req.data.TeacherID } });
  //   if (existingTeacher) {
  //     req.error(400, `A teacher with the name '${req.data.Name}' already exists with ID '${existingTeacher.TeacherID}'.`);
  //   }
  // }

  // Check if the phone number already exists with a different ID
  // if (req.data.PhoneNumber) {
  //   const existingPhone = await SELECT.one.from(Teacher)
  //     .where({ PhoneNumber: req.data.PhoneNumber, TeacherID: { '!=': req.data.TeacherID } });
  //   if (existingPhone) {
  //     req.error(409, `Phone number ${req.data.PhoneNumber} already exists.`);
  //   }
  // }

  // Validate Email
  // if (req.data.Email) {
  //   const existingEmail = await SELECT.one.from(Teacher)
  //     .where({ Email: req.data.Email, TeacherID: { '!=': req.data.TeacherID } });
  //   if (existingEmail) {
  //     req.error(409, `Email ${req.data.Email} already exists with ID '${existingEmail.TeacherID}'.`);
  //   }
  // }

});
this.before('CREATE', 'Teacher', async (req) => {
   const oauthToken = await generateToken();


    var token = `Bearer ${oauthToken}`;

  
    var auth1 =  await SELECT.one.from(authorisation).where ({DepartmentName : req.data.DepartmentName});
    debugger
    if (auth1){
        var HOD_Email = auth1.Email;
    }
    else{
      HOD_Email = '';
    }
        var auth2 =  await SELECT.one.from(authorisation).where ({role : 'Admin'});
        var Admin_Email = auth2.Email;

        // var sUrl = "Teacher(ttuuid=" + req.data.ttuuid + ",IsActiveEntity=true)/TeatoFile";
        var sUrll = 'Teacher(ttuuid=';
        var y = req.data.ttuuid;
        var z = ',IsActiveEntity=true)/TeatoFile';
        var sUrl = sUrll + y + z;


        var data = JSON.stringify({
      
          "definitionId": "us10.3e1cae61trial.lecturer.lecturer",
          "context": {
           
            "teacherName": req.data.Name ,
            "teacherEmail": req.data.Email   ,
            "teacherPhoneNumber":req.data.PhoneNumber,
            "teacherAddress": req.data.Address,
              "hodemail": HOD_Email,
               "adminemail": Admin_Email  ,
                "teacherAge": req.data.Age,
                "teacherDob": req.data.Dob ,
                "departmentname": req.data.DepartmentName,
                "additionalskills": req.data.AdditionalSkills,
                "gender": req.data.Gender,
                "teacherid": req.data.TeacherID ,
                "ttuuid": req.data.ttuuid,
                "link": sUrl
        
        
              
          }
          
         
        });  
        

        // console.log('Payload data:', data);
        // debugger
        // const SPA_API = await cds.connect.to('BpaDest');
        // const result = await SPA_API.post(
        //   '/workflow/rest/v1/workflow-instances',
        //   data, {
        //   "Content-Type": "application/json"
        // });
        // return result;
    
        const response = await axios.post(
          "https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances",
          data,
          {
            headers: {
              "Accept-Language": "en",
              "DataServiceVersion": "2.0",
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": token
            }
          }
    
        );
    
  });

//   this.before('CREATE', Teacher.drafts, async (req) => {
//     debugger
//         let randomNumber = `T${Math.floor(Math.random() * 100) + 1}`;  
//         req.data.TeacherID = randomNumber;
// }); 

   this.before('UPDATE', Teacher, fileUpload);
    this.before('CREATE', Teacher, fileUpload);
   async function fileUpload(req){
    if(req.data.TeatoFile){
        for (const stud of req.data.TeatoFile) { 
                stud.url = `Files(ID=${stud.ID},IsActiveEntity=true)/content`
        }
    }
}     
});