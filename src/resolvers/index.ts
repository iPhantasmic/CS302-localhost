import GetUser from './getUser';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';
import UpdateUser from './updateUser';
import DeleteUser from './deleteUser';
import ValidateToken from './validateToken';
import PublishBookingConfirmed from "./emailBookingConfirmed"
import GetBookingByUser from './getBooking';
import MakeBooking from './makeBooking';

const resolvers: any  = {
  Mutation: {
    RegisterUser,
    UpdateUser,
    DeleteUser,
    MakeBooking
  },
  Query: {
    GetUser,
    LoginUser,
    ValidateToken,
    PublishBookingConfirmed,
    GetBookingByUser,
  },
};

export default resolvers;