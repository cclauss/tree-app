/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { translate } from '@geops/tree-lib';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';
import qs from 'query-string';

import ChoiceButton from './ChoiceButton';
import Dropdown from './Dropdown';
import { setFormLocation } from '../store/actions';
import styles from './ProjectionForm.module.css';

const getButtonOptions = (type, language) => key => ({
  key,
  label: translate(type, key, language),
});
const getDropdownOptions = (type, language, includeKey = false) => key => ({
  key,
  text: includeKey
    ? `${key} - ${translate(type, key, language)}`
    : translate(type, key, language),
  value: key,
});

const parsed = qs.parse(window.location.search);

function ProjectionForm() {
  const dispatch = useDispatch();
  const {
    location,
    mapLocation,
    projectionLocation,
    projectionMode,
    projectionOptions,
  } = useSelector(state => ({
    location: state.location,
    mapLocation: state.mapLocation,
    projectionLocation: state.projectionLocation,
    projectionMode: state.projectionMode,
    projectionOptions: state.projectionOptions,
  }));
  const [fieldActive, setFieldActive] = useState('');
  const activateField = field => setFieldActive(field);
  const deactivateField = () => setFieldActive('');

  const getValue = field =>
    projectionOptions[field].includes(location[field]) ? location[field] : '';

  const isDifferent = field => mapLocation[field] !== projectionLocation[field];

  const setLocation = (key, value) => {
    setFieldActive('');
    dispatch(setFormLocation({ [key]: value }));
  };

  const { t, i18n } = useTranslation();

  // Note: remember to keep formLocationFields in reducers.js updated.
  return (
    <Form
      className={
        projectionMode === 'm' || fieldActive ? styles.formActive : styles.form
      }
    >
      {projectionOptions.forestType && (
        <Form.Field>
          <label>{t('forestType.label')}</label>
          <Dropdown
            className={styles.forestType}
            clearable={projectionMode === 'f' && isDifferent('forestType')}
            disabled={!parsed.manual}
            options={projectionOptions.forestType.map(
              getDropdownOptions('forestType', i18n.language, true),
            )}
            onChange={(e, { value }) => setLocation('forestType', value)}
            onBlur={deactivateField}
            onFocus={() => activateField('forestType')}
            placeholder={
              projectionMode === 'm'
                ? t('forestType.hint')
                : t('dropdown.placeholder')
            }
            value={getValue('forestType')}
          />
          {projectionMode === 'm' &&
            location.coordinate &&
            !location.forestType && (
              <Label pointing>
                {t('errorMessage.incompleteLocationInput')}
              </Label>
            )}
        </Form.Field>
      )}
      {projectionMode === 'f' && projectionOptions.forestEcoregion && (
        <Form.Field>
          <label>{t('forestEcoregion.label')}</label>
          <Dropdown
            disabled={!parsed.manual}
            clearable={isDifferent('forestEcoregion')}
            options={projectionOptions.forestEcoregion.map(
              getDropdownOptions('forestEcoregion', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('forestEcoregion', value)}
            onBlur={deactivateField}
            onFocus={() => activateField('forestEcoregion')}
            value={getValue('forestEcoregion')}
          />
        </Form.Field>
      )}
      {projectionMode === 'f' && projectionOptions.altitudinalZone && (
        <Form.Field>
          <label>{t('altitudinalZone.label')}</label>
          <Dropdown
            disabled={!parsed.manual}
            clearable={isDifferent('altitudinalZone')}
            options={projectionOptions.altitudinalZone.map(
              getDropdownOptions('altitudinalZone', i18n.language),
            )}
            onChange={(e, { value }) => {
              setLocation('altitudinalZone', value || undefined);
            }}
            onBlur={deactivateField}
            onFocus={() => activateField('altitudinalZone')}
            value={getValue('altitudinalZone')}
          />
        </Form.Field>
      )}
      {projectionOptions.slope && projectionOptions.slope.length > 1 && (
        <ChoiceButton
          label={t('slope.label')}
          options={projectionOptions.slope.map(
            getButtonOptions('slope', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('slope', value)}
          value={getValue('slope')}
        />
      )}
      {projectionOptions.additional &&
        projectionOptions.additional.length > 1 && (
          <ChoiceButton
            label={t('additional.label')}
            options={projectionOptions.additional.map(
              getButtonOptions('additional', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('additional', value)}
            value={getValue('additional')}
          />
        )}
      {projectionOptions.silverFirArea &&
        projectionOptions.silverFirArea.length > 1 && (
          <ChoiceButton
            label={t('silverFirArea.label')}
            options={projectionOptions.silverFirArea.map(
              getButtonOptions('silverFirArea', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('silverFirArea', value)}
            value={getValue('silverFirArea')}
          />
        )}
      {projectionOptions.relief && projectionOptions.relief.length > 1 && (
        <ChoiceButton
          label={t('relief.label')}
          options={projectionOptions.relief.map(
            getButtonOptions('relief', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('relief', value)}
          value={getValue('relief')}
        />
      )}
    </Form>
  );
}

export default ProjectionForm;
