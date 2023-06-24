import ContentLoader from 'react-content-loader'

const LoginSkeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={600}
    height={300}
    viewBox='0 0 600 300'
    backgroundColor='#c4c4c4'
    foregroundColor='#969696'
    {...props}
  >
    <rect x='26' y='1' rx='0' ry='0' width='5' height='322' />
    <rect x='586' y='0' rx='0' ry='0' width='5' height='303' />
    <rect x='27' y='0' rx='0' ry='0' width='560' height='5' />
    <rect x='29' y='296' rx='0' ry='0' width='560' height='5' />
    <rect x='83' y='44' rx='12' ry='12' width='183' height='30' />
    <rect x='83' y='136' rx='24' ry='24' width='442' height='45' />
    <rect x='83' y='195' rx='24' ry='24' width='442' height='45' />
  </ContentLoader>
)

export default LoginSkeleton
