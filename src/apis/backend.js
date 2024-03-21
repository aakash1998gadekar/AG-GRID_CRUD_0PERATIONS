export const getAllStudent = async () => {
  try {
    const params = new URLSearchParams();
    params.append("queryId", "GET_ALL");
    params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    // params.append('resource', 'eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ==');

    const response = await fetch("api/student?" + params.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const jsonData = await response.json();
    console.log(jsonData.resource);
    const studentsData = jsonData.resource;
    return studentsData;
    //   const data = await response.json();
    //   setStudents(data);
    //   setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const addStudents = async () => {
  const mob=Math.random();
  try {
    const params = new URLSearchParams();
    // JSON object
const jsonObj = {"student_name":"aman","student_batch_id":"b7578632-cf6b-41ed-a2ac-2e47d5e3edef-10","student_email_id":"dummy@gmail.com","student_phone_number":mob,"student_roll_number":"IMT2002352"};

// Convert JSON object to string
const jsonString = JSON.stringify(jsonObj);

// Encode string to Base64
const base64Encoded = Buffer.from(jsonString).toString('base64');

console.log(base64Encoded);


    params.append(
      "resource",
      base64Encoded
    );
    params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    // params.append('resource', 'eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ==');

    const response = await fetch("api/student?" + params.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // const jsonData = await response.json();
    // console.log(jsonData.resource[0]);
    //   const data = await response.json();
    //   setStudents(data);
    //   setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
