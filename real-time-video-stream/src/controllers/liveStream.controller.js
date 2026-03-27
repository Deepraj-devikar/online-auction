import HttpStatus from 'http-status-codes';
import { runNodeMediaServer, stopNodeMediaServer } from '../utils/liveStream.util';

/**
 * Controller to create a new liveStream
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const setRTMPServer = async (req, res, next) => {
  try {
    const startDuration = req.body.startDuration.split(":");
    let startDurationMS = (parseInt(startDuration[0]) * 60 + parseInt(startDuration[1])) * 60 * 1000;
    startDurationMS = startDurationMS > 0 ? startDurationMS : 0;

    const liveStreamDuration = req.body.liveStreamDuration.split(":");
    const liveStreamDurationMS = (parseInt(liveStreamDuration[0]) * 60 + parseInt(liveStreamDuration[1])) * 60 * 1000;

    // will run node media server at start time
    runNodeMediaServer(startDurationMS, req.body.appName)
    .then(nodeMediaServer => {
      stopNodeMediaServer(nodeMediaServer, liveStreamDurationMS);
    })
    .catch(error => {
      // node media server is not running
      next(error);
    });

    const currentDateTime = new Date();
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: 'LiveStream created successfully',
      startDateTime: new Date(currentDateTime.getTime() + startDurationMS),
      endDateTime: new Date(currentDateTime.getTime() + startDurationMS + liveStreamDurationMS)
    });
  } catch (error) {
    next(error);
  }
};

export const currentTime = async (req, res, next) => {
  res.status(HttpStatus.OK).json({
    code: HttpStatus.OK,
    currentDateTime: new Date(),
    message: 'current time'
  })
}