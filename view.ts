const { AppDataSource } = require('./src/data-source'); // Adjust the path as needed
const { User } = require('./src/models/User');

(async () => {
  await AppDataSource.initialize();
  // function to see the columns of table
  // const userMetadata = AppDataSource.getMetadata(User); 
  // console.log(userMetadata.columns.map((column: any) => column.propertyName));

  //function to see all users in the table
    const users = await User.find();
    console.log(users);

    // Delete all users
  await User.clear();
  console.log('All users deleted successfully');
  console.log(users);


  // Optionally, you can verify that all users have been deleted
  
})();