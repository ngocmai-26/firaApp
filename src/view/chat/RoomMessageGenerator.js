import RoomMessage from "./RoomMessage"

function RoomMessageGenerator({ rooms, activeRoom, handleCloseExpandBox,handleExpand }) {
  return (
    <>
      {rooms.map((room, index) => {
        return (
          <RoomMessage
            room={room}
            key={index.toString()}
            activeRoom={activeRoom}
            handleCloseExpandBox={handleCloseExpandBox}
            handleExpand={handleExpand}
          />
        )
      })}
    </>
  )
}

export default RoomMessageGenerator
