import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import getImages from 'components/getImages';
import { AppContainer } from 'components/App/App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';

const App = () => {
  const [data, setData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data === '') {
      return;
    }
    setIsLoading(true);
    getImages(data, page)
      .then(({ hits, totalHits }) => {
        if (!hits?.length) {
          setIsEmpty(true);
          return;
        }
        setImages(images => [...images, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .finally(() => setIsLoading(false));
  }, [page, data]);

  const handleFormSubmit = data => {
    setData(data);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {showBtn && <Button onClick={onLoadMore} />}
      {isEmpty && (
        <h2>
          There are no pictures with the name {data} in our database, try
          another request!
        </h2>
      )}
      <ToastContainer autoCloseClose={3000} />
    </AppContainer>
  );
};

export default App;
