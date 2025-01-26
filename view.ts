const { AppDataSource } = require('./src/data-source'); // Adjust the path as needed
const { User } = require('./src/models/User');

(async () => {
  await AppDataSource.initialize();
  // function to see the columns of table
  const userMetadata = AppDataSource.getMetadata(User); 
  console.log(userMetadata.columns.map((column: any) => column.propertyName));

  //function to see all users in the table
    const users = await User.find();
    console.log(users);
})();