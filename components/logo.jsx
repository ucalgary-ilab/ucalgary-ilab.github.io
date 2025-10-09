import Image from 'next/image'

export default function Logo({}) {
  return (
    <div className="ui two column centered grid">
      <div className="ui container">
        <Image width={0} height={0} id="header-logo" alt="ilab logo" src="/static/images/ilab-logo-3d.jpg" />
      </div>
    </div>
  );
}