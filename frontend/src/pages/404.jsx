import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import notFoundImageSrc from '@/assets/images/404.svg'

export const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center">
      <img
        src={notFoundImageSrc}
        alt="Not found"
        className="img-fluid h-25 mb-6"
      />

      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.hint')}
        {' '}
        <Link to="/" className="text-blue-600 hover:underline">
          {t('notFound.link')}
        </Link>
      </p>
    </main>
  )
}
