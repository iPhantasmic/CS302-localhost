import GetUser from './getUser';
import PublishBookingConfirmed from "./emailBookingConfirmed"
import GetBookingByUser from './getBooking';
import MakeBooking from './makeBooking';

const resolvers: any  = {
//   Mutation: {
//     addPost
//   },
  Query: {
    GetUser,
    PublishBookingConfirmed,
    GetBookingByUser,
    MakeBooking
  },
};

export default resolvers;