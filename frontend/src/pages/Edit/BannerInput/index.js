import React, { useState, useEffect, useRef } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container, EmptyBanner } from './styles';

function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const ref = useRef();

  useEffect(() => {
    if (defaultValue) {
      setFile(defaultValue.id);
      setPreview(defaultValue.url);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, []); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner" />
        ) : (
          <EmptyBanner>
            <MdCameraAlt size={62} />
            <strong>Selecionar imagem</strong>
          </EmptyBanner>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default BannerInput;
