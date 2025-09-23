import Image from 'next/image'

export default function Logo(props) {
  return (
    <div class="ui two column centered grid">
      <div class="ui container">
        <Image width={0} height={0} id="header-logo" src="/static/images/ilab-logo-3d.jpg" />
      </div>
    </div>
  );
}