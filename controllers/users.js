const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const { OAuth2Client } = require('google-auth-library');
const clientId = '504512501279-8obbvng58inovbmmb3kldik1p3r4q3a2.apps.googleusercontent.com'


//sets payload //changed id to _id key
const getUserPayload = (user) => {
    return { id: user._id, email: user.email }
}

//register a user
module.exports.register = async (firstName, lastName, email, password) => {

    const foundUser =  await User.findOne({email});

    if (foundUser) {
        throw new Error('Email already taken.')
    }

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        loginType: 'email'
    })

    const createdUser = await user.save();
    const userPayload = getUserPayload(createdUser);
    return userPayload;
}

//login user through email
module.exports.login = async (email, password) => {

    if (!email || !password) {
        throw new Error('No email and/or password.');
    } 

    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error('User not found.')
    }

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
        throw new Error('Password incorrect.');
    }

    const payload = getUserPayload(user);
    const accessToken = auth.createAccessToken(payload);
    return accessToken;
}

//google login verification
module.exports.verifyGoogleTokenId = async (tokenId) => {
	// console.log(tokenId)

	//middleman
	const client = new OAuth2Client(clientId)
	const data = await client.verifyIdToken({
		idToken: tokenId,
		audience: clientId
	})

	// console.log(data);
	console.log(data.payload.email_verified);

	if (data.payload.email_verified === true) {
		const user = await User.findOne({ email: data.payload.email });
	
		console.log(data.payload);
		// console.log(user);
		// return true

		if (user !== null) {
			
			if (user.loginType === 'google') {
				return { accessToken: auth.createAccessToken(getUserPayload(user)) };
			} else {
				return { error: 'login-type-error' }
			}

		} else {
			let user = new User({
				firstName: data.payload.given_name,
				lastName: data.payload.family_name,
				email: data.payload.email,
				//no info in payload, disregard
				// mobileNo: params.mobileNo,
				// password: bcrypt.hashSync(params.password, 10),
				loginType: 'google'
			})
		
			return user.save().then((user, err) => {
				return { accessToken: auth.createAccessToken(user.toObject()) };
			})
		}
	} else {
		return { error: 'google-auth-error' }
	}
};


//get user details
module.exports.getUserDetails = ({userId}) => {
	return User.findById(userId).then(user => {
        // console.log(userId)
		user.password = undefined
		return user
	})
}


//update details of user
module.exports.updateUserDetails = (userId, firstName, lastName, email, password) => {
    const updates = {};
    
    if (firstName){
		updates.firstName = firstName
	}
	if (lastName) {
		updates.lastName = lastName
	}
	if (email) {
		updates.email = email
	}
	
	if (password) {
		updates.password = password
	}

	const user = User.findByIdAndUpdate(userId, updates);
    return user;
}