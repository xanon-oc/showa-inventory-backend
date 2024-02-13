import { Model, Schema, model } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const AuthSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String },
    email: { type: String, trim: true, unique: true },
    password: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female'] },
    role: { type: String, enum: ['admin', 'user'] },
  },
  { timestamps: true, versionKey: false },
);

// encrypting the password
AuthSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// remove password from returned document
AuthSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.passwordChangeHistory;
  },
});

// is user exists checking
AuthSchema.statics.isUserExists = async function name(email: string) {
  return await User.findOne({ email });
};

//is password matched checking
AuthSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

AuthSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

AuthSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', AuthSchema);
