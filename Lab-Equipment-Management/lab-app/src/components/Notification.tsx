import { FC } from 'react';
import notification1 from "../assets/notification/image.jpg";

interface NotificationProps {
  className?: string;
  title: string;
}

const Notification: FC<NotificationProps> = ({ className, title }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5`}
    >
      <img
        src={notification1}
        width={62}
        height={62}
        alt="image"
        className="rounded-xl"
      />

      <div className="flex-1">
        <h6 className="mb-1 font-semibold text-base">{title}</h6>

        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
          <div className="body-2 text-green-600">open</div>
          </ul>
          
        </div>
      </div>
    </div>
  );
};

export default Notification;
