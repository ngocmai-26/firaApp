import RoomMessage from "./RoomMessage"

function RoomMessageGenerator({ rooms, activeRoom, expandBox, handleCloseExpandBox,handleExpand }) {
  return (
    <>
      {rooms.map((room, index) => {
        return (
          <RoomMessage
            room={room}
            key={index.toString()}
            activeRoom={activeRoom}
            expandBox={expandBox}
            handleCloseExpandBox={handleCloseExpandBox}
            handleExpand={handleExpand}
          />
        )
      })}
    </>
  )
}

export default RoomMessageGenerator
