import GetUser from './getUser';
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