import { connect } from 'mongoose';
import environment from '../config/environment';

export default connect(environment.databaseUrl.dev);
