import Image from 'next/image'

export default function Logo({}) {
  return (
      <div className="ui container">
        <div className="ui basic segment">
          <Image width={0} height={0} class="ui large centered image" alt="Interactions Lab logo" src="/static/images/ilab-logo-3d.jpg" />
        </div>
      </div>
  );
}