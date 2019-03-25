import { connect } from 'react-redux';
import Week from '../components/Week';

const mapStateToProps = (state: any) => {
    const { week } = state;
    return { data: week };
};

export default connect(mapStateToProps)(Week);