import GetUser from './getUser';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';
import UpdateUser from './updateUser';
import DeleteUser from './deleteUser';
import ValidateToken from './validateToken';
import PublishBookingConfirmed from "./emailBookingConfirmed"
import GetBookingByUser from './getBooking';
import MakeBooking from './makeBooking';
import GetReview from './getReview';
import CreateReview from "./createReview"
import DeleteReview from "./deleteReview"
import GetListing from "./getListing"
import GetAllListings from "./getAllListings"
import GetAvailableListings from "./getAvailableListings"
import CreateListing from "./createListing"
import UpdateListing from "./updateListing"
import DeleteListing from "./deleteListing"
const resolvers: any  = {
  Query: {
    GetUser,
    GetBookingByUser,
    GetReview,
    GetListing,
    GetAllListings,
    GetAvailableListings,
    ValidateToken,
    PublishBookingConfirmed,
  },
  Mutation: {
    RegisterUser,
    UpdateUser,
    DeleteUser,
    MakeBooking,
    CreateReview,
    DeleteReview,
    CreateListing,
    UpdateListing,
    DeleteListing
  }
};

export default resolvers;