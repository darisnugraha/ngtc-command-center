import { useSelector } from 'react-redux';
import { toAbsoluteUrl } from '../../../helpers';
import { RootState } from '../../../../setup/redux/RootReducer';

export function FallbackView() {
  const isLoading = useSelector<RootState, boolean>(({ utility }) => utility.isLoadingContent);
  return (
    <div className={`splash-screen ${isLoading ? '' : 'd-none'}`}>
      <img src={toAbsoluteUrl('/media/logos/ngtc-loading.gif')} alt='Start logo' width={'100vw'} />
      <h1>Loading ...</h1>
    </div>
  );
}
