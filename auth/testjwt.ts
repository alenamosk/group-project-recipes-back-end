const exampleUserInfo = {
  userId: 344,
};

const retrievedUserInfo = toData(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMTQyODMwOSwiZXhwIjoxNzAyNjM3OTA5fQ.uaWecZ6mWGUupAp9j2vpeFNIaieRCNMPrrE_Mgmp50Q'
);

console.log('Retrieved User Information from JWT Token:', retrievedUserInfo);
