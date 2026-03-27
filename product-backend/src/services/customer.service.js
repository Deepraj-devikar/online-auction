import Customer from '../models/customer.model';

//create new customer
export const addAddress = async (body) => {
  let customer = await getCustomer(body.userID);
  if(!customer){
    customer = await Customer.create({
      userID: body.userID,
      addresses: [{
        name: body.name,
        phoneNumber: body.phoneNumber,
        addressType: body.addressType,
        fullAddress: body.fullAddress,
        city: body.city,
        landmark: body.landmark,
        state: body.state,
        pinCode: body.pinCode,
        locality: body.locality
      }]
    });
    return customer;
  }
  let newCustomer;
  if(body.addressIndex >= 0){
    const updateAddress = {};
    updateAddress[`addresses.${body.addressIndex}.name`] = body.name;
    updateAddress[`addresses.${body.addressIndex}.phoneNumber`] = body.phoneNumber;
    updateAddress[`addresses.${body.addressIndex}.addressType`] = body.addressType;
    updateAddress[`addresses.${body.addressIndex}.fullAddress`] = body.fullAddress;
    updateAddress[`addresses.${body.addressIndex}.city`] = body.city;
    updateAddress[`addresses.${body.addressIndex}.landmark`] = body.landmark;
    updateAddress[`addresses.${body.addressIndex}.state`] = body.state;
    updateAddress[`addresses.${body.addressIndex}.pinCode`] = body.pinCode;
    updateAddress[`addresses.${body.addressIndex}.locality`] = body.locality;
    newCustomer = await Customer.updateOne(
      {
        _id: customer._id
      },
      {
        $set: updateAddress
      }
    );
  }else{
    newCustomer = await Customer.updateOne(
      {
        _id: customer._id
      },
      {
        $push: {
          addresses: {
            name: body.name,
            phoneNumber: body.phoneNumber,
            addressType: body.addressType,
            fullAddress: body.fullAddress,
            city: body.city,
            landmark: body.landmark,
            state: body.state,
            pinCode: body.pinCode,
            locality: body.locality
          }
        }
      }
    );
  }
  return newCustomer;
};

//get single customer
export const getCustomer = async (userID) => {
  const data = await Customer.findOne({userID});
  return data;
};