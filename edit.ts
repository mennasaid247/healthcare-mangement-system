import { AppDataSource } from './src/data-source'; // Adjust the path as needed
import { User } from './src/models/User';

(async () => {
  await AppDataSource.initialize();
  // function to see the columns of table
//   const userMetadata = AppDataSource.getMetadata(User); 
//   console.log(userMetadata.columns.map((column: any) => column.propertyName));

  //function to see all users in the table
    await User.clear();
    // console.log(users);
    // Sort users by current ID
    
  


})();