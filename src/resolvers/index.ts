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
<<<<<<< HEAD
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
=======
  Query: {
    GetUser,
    GetBookingByUser,
    GetReview,
    GetListing,
    GetAllListings,
    GetAvailableListings,
>>>>>>> 2e378bf (feat: mappings for listing and reviews)
  },
  Mutation: {
    PublishBookingConfirmed,
    MakeBooking,
    CreateReview,
    DeleteReview,
    CreateListing,
    UpdateListing,
    DeleteListing
  }
};

export default resolvers;