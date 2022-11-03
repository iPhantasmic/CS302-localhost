import GetUser from './getUser';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';
import UpdateUser from './updateUser';
import DeleteUser from './deleteUser';
import ValidateToken from './validateToken';
import PublishBookingConfirmed from "./emailBookingConfirmed"
import GetBookingByUser from './getBookingByUser';
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
import CancelBooking from "./cancelBooking"
import DeleteBookingById from './deleteBookingById';
import GetBookingById from "./getBookingById"
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
    GetBookingById
  },
  Mutation: {
    PublishBookingConfirmed,
    MakeBooking,
    CreateReview,
    DeleteReview,
    CreateListing,
    UpdateListing,
    DeleteListing,
    DeleteBookingById,
    CancelBooking,
    DeleteUser,
    RegisterUser,
    LoginUser,
    UpdateUser
  }
};

export default resolvers;