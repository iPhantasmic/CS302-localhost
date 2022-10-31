import GetUser from './getUser';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';
import ValidateToken from './validateToken';
import PublishBookingConfirmed from "./emailBookingConfirmed"
import GetBookingByUser from './getBooking';
import MakeBooking from './makeBooking';

const resolvers: any  = {
  Mutation: {
    RegisterUser,
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