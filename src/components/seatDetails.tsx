"use client";

interface SeatDetailsProps {
  field: string;
  value: string;
}

export const SeatDetails = ({ field, value }: SeatDetailsProps) => {
  return (
    <div className="flex justify-between items-end">
      <span className="text-xs">{field}:</span>
      <b>{value}</b>
    </div>
  );
};
