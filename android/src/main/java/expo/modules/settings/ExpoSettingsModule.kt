package expo.modules.settings

import android.os.Bundle
import android.util.Log
import androidx.core.net.toUri
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.MediaMetadata
import com.google.android.exoplayer2.Player
import com.google.gson.Gson
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

const val ON_STATE_CHANGE = "onStateChange"
const val ON_TRACK_CHANGE = "onTrackChange"


internal class Track : Record {
    @Field
    var title: String? = null
    @Field
    var artist: String? = null
    @Field
    var uri: String? = null
    @Field
    var artwork: String? = null
}


class ExpoSettingsModule : Module() {
    private var mPlayer: ExoPlayer? = null

    override fun definition() = ModuleDefinition {
        Name("ExpoSettings")
        Events(ON_STATE_CHANGE,ON_TRACK_CHANGE)

        OnStartObserving {
            mPlayer?.addListener(playbackStateListener())
        }


        Function("initializePlayer") {
            initializePlayer()
        }

        Function("load") { uri: String ->
            load(uri)
        }

        Function("loadMultiple") { tracks: List<Track> ->
            loadMultiple(tracks)
        }

        Function("pause") {
            pause()
        }

        Function("play") {
            play()
        }

        Function("stop") {
            stop()
        }

        Function("skipToNext") {
            skipToNext()
        }

        Function("skipToPrevious") {
            skipToPrevious()
        }

        Function("reset") {
            reset()
        }
    }

    private val context
        get() = requireNotNull(appContext.reactContext)

    private fun initializePlayer() {
        if (mPlayer == null) {
            mPlayer = ExoPlayer.Builder(context).build()
        }
    }

    private fun load(uri: String) {
        val mediaItem = MediaItem.Builder()
            .setUri(uri)
            .build()
        mPlayer?.setMediaItem(mediaItem)

        mPlayer?.prepare()
    }

    private fun loadMultiple(tracks: List<Track>) {
        val mediaItems = tracks.map {
            val extras = Bundle()
            extras.putString("artwork", it.artwork)

            val metadata: MediaMetadata = MediaMetadata.Builder()
                .setTitle(it.title)
                .setArtist(it.artist).
                 setExtras(extras)
                .build()

            MediaItem.Builder()
                .setUri(it.uri)
                .setMediaMetadata(metadata)
                .build()
        }

        mPlayer?.setMediaItems(mediaItems)
        mPlayer?.prepare()
    }

    private fun pause() {
        if (mPlayer?.isPlaying == true) {
            mPlayer?.pause()
        }
    }

    private fun play() {
        if (mPlayer?.isPlaying == false) {
            mPlayer?.play()
        }
    }

    private fun stop() {
        mPlayer?.stop()
    }

    private fun skipToNext() {
        mPlayer?.seekToNextMediaItem()
    }

    private fun skipToPrevious() {
        mPlayer?.seekToPreviousMediaItem()
    }

    private fun reset() {
        mPlayer?.stop()
        mPlayer?.clearMediaItems()
    }

    private fun playbackStateListener() = object : Player.Listener {
        override fun onPlaybackStateChanged(playbackState: Int) {
            val stateString: String = when (playbackState) {
                ExoPlayer.STATE_IDLE -> "STATE_IDLE"
                ExoPlayer.STATE_BUFFERING -> "STATE_BUFFERING"
                ExoPlayer.STATE_READY -> "STATE_READY"
                ExoPlayer.STATE_ENDED -> "STATE_ENDED"
                else -> "UNKNOWN_STATE"
            }

            Log.d("ExoPlayer", "changed state to $stateString")
            sendEvent(ON_STATE_CHANGE, mapOf("state" to stateString))
        }

        override fun onMediaItemTransition(mediaItem: MediaItem?, reason: Int) {
            mediaItem?.mediaMetadata?.let { metadata ->
                val stringMetaData= Gson().toJson(metadata)
                Log.d("ExoPlayer", "mediaMetadata: $stringMetaData")
                sendEvent(ON_TRACK_CHANGE, mapOf("track" to stringMetaData))
            }
        }
    }
}


