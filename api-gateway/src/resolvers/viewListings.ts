import BookingClient from '../services/booking/BookingClient'
import ListingClient from '../services/listing/ListingClient'

const booking_client = BookingClient()
const listing_client = ListingClient()

export default (root: any, params: any) => {
    return new Promise((resolve: any, reject: any) => {
        console.log(params)
        var booking_client_params = {
            "country":params.data.country,
            "city": params.data.city,
            "rooms":params.data.rooms,
        }
        booking_client.GetUnavailableListings(params.data, function (err: any, response: any) {
            if (err) {
                return reject(err)
            }
            console.log(response)
            if (Object.keys(response).length==0){
                booking_client_params["listings"] = [ "00000000-0000-0000-0000-000000000000"]
            }
            else{
                booking_client_params["listings"] = response["listingIds"]
            }
            console.log(booking_client_params)
            listing_client.GetAvailableListings(booking_client_params, function(err: any, response: any) {
                if (err) {
                  return reject(err);
                }
                console.log(response)
                resolve(response);
              });
        })
    })
}
