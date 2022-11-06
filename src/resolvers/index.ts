import GetUser from './getUser';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';
import UpdateUser from './updateUser';
import DeleteUser from './deleteUser';
import ValidateToken from './validateToken';
import PublishBookingConfirmed from "./emailBookingConfirmed"
import PublishBookingCancelled from "./emailBookingCancelled"
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
import ViewListings from "./viewListings"
import GetUnavailableListings from "./getUnavailableListings";
const resolvers: any  = {
  Query: {
    GetUser,
    LoginUser,
    GetBookingByUser,
    GetReview,
    GetListing,
    GetAllListings,
    GetAvailableListings,
    ValidateToken,
    PublishBookingConfirmed,
    PublishBookingCancelled,
    GetBookingById,
    GetUnavailableListings,
    ViewListings //Composite
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
    DeleteListing,
    DeleteBookingById,
    CancelBooking
  }
};

export default resolvers;
