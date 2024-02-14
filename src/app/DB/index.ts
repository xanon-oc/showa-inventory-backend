import config from '../config';
import { User } from '../modules/auth/auth.model';
import { USER_ROLE } from '../types/index.type';

const superUSer = {
  id: '0001',
  email: 'niloyroy184@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when database is connected , we will check is there any user who is super admin

  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExists) {
    await User.create(superUSer);
  }
};
export default seedSuperAdmin;
