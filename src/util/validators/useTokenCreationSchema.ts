import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toSatoshi } from 'satoshi-bitcoin';
import { selectUnspentBalance } from 'store/selectors';
import { FEE } from 'vars/defines';
import * as yup from 'yup';

const useTokenCreationSchema = () => {
  const balance = useSelector(selectUnspentBalance);
  const maxSupply = useMemo(() => toSatoshi(balance) - toSatoshi(FEE), [balance]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().max(32).required(),
        description: yup.string().max(4096).required(),
        supply: yup
          .number()
          .required()
          .positive()
          .integer()
          .max(maxSupply, 'not enough TKL in wallet'),
        url: yup.string().url('must be a valid URL'),
        royalty: yup.number().min(0.1).max(100),
        id: yup.number().positive().integer(),

        confirmation: yup.boolean().oneOf([true], ''),

        dataAsJson: yup.object().shape({
          constellation_name: yup.string().max(32),
          number_in_constellation: yup.number().min(1),
        }),

        dataAsJsonUnformatted: yup.array().of(
          yup.object().shape({
            key: yup.string().required(),
            value: yup.string().required(),
          })
        ),
      }),
    [maxSupply]
  );

  return schema;
};

export default useTokenCreationSchema;