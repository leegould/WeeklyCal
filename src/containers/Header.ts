import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state: any) => {
    const { week } = state;
    return { data: week };
};

export default connect(mapStateToProps)(Header);