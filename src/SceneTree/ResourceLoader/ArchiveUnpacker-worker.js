// <!-- prettier-ignore-start -->
/* eslint-disable require-jsdoc */

const Module = {}

const WorkerScope = {}

//--------------------unpackBridge.js----------------------------
!(function (t, e) {
  // The following code has been _carefully_ modified by hand.
  // There were various cases for in what context the code might
  // be run, and I removed all but the webworker case.
  // There was code to handle loading in a nodeJS context, that tried to import("fs")
  // WebPack kepts tripping up on that code in its static analysis of the code, so
  // I carefully removed it.
  t.unpackBridge = e(t.fs)
})(WorkerScope, function (t) {
  return (function (t) {
    var e = {}
    function r(n) {
      if (e[n]) return e[n].exports
      var i = (e[n] = { i: n, l: !1, exports: {} })
      return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n })
      }),
      (r.r = function (t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (r.t = function (t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t
        var n = Object.create(null)
        if ((r.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
          for (var i in t)
            r.d(
              n,
              i,
              function (e) {
                return t[e]
              }.bind(null, i)
            )
        return n
      }),
      (r.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default
              }
            : function () {
                return t
              }
        return r.d(e, 'a', e), e
      }),
      (r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (r.p = ''),
      r((r.s = 2))
    )
  })([
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 })
      const n = r(1),
        i = {
          0: 'ERAR_SUCCESS',
          10: 'ERAR_END_ARCHIVE',
          11: 'ERAR_NO_MEMORY',
          12: 'ERAR_BAD_DATA',
          13: 'ERAR_BAD_ARCHIVE',
          14: 'ERAR_UNKNOWN_FORMAT',
          15: 'ERAR_EOPEN',
          16: 'ERAR_ECREATE',
          17: 'ERAR_ECLOSE',
          18: 'ERAR_EREAD',
          19: 'ERAR_EWRITE',
          20: 'ERAR_SMALL_BUF',
          21: 'ERAR_UNKNOWN',
          22: 'ERAR_MISSING_PASSWORD',
          23: 'ERAR_EREFERENCE',
          24: 'ERAR_BAD_PASSWORD',
        },
        o = {
          0: 'Success',
          11: 'Not enough memory',
          12: 'Archive header or data are damaged',
          13: 'File is not RAR archive',
          14: 'Unknown archive format',
          15: 'File open error',
          16: 'File create error',
          17: 'File close error',
          18: 'File read error',
          19: 'File write error',
          20: 'Buffer for archive comment is too small, comment truncated',
          21: 'Unknown error',
          22: 'Password for encrypted file or header is not specified',
          23: 'Cannot open file source for reference record',
          24: 'Wrong password is specified',
        }
      class s {
        constructor(t = '') {
          ;(this._password = t), (this._archive = null)
        }
        getFileList() {
          let t,
            [e, r] = this.openArc(!0)
          if ('SUCCESS' !== e.state) t = [e, null]
          else {
            let e,
              n,
              i = []
            for (; ([e, n] = this.processNextFile(() => !0)), 'SUCCESS' === e.state; ) i.push(n.fileHeader)
            t = 'ERAR_END_ARCHIVE' !== e.reason ? [e, null] : [{ state: 'SUCCESS' }, { arcHeader: r, fileHeaders: i }]
          }
          return this.closeArc(), t
        }
        extractAll() {
          let t,
            [e, r] = this.openArc(!1)
          if ('SUCCESS' !== e.state) t = [e, null]
          else {
            let e,
              n,
              i = []
            for (; ([e, n] = this.processNextFile(() => !1)), 'SUCCESS' === e.state; ) i.push(n)
            t = 'ERAR_END_ARCHIVE' !== e.reason ? [e, null] : [{ state: 'SUCCESS' }, { arcHeader: r, files: i }]
          }
          return this.closeArc(), t
        }
        extractFiles(t, e) {
          let r,
            [n, i] = this.openArc(!1, e),
            o = {}
          for (let e = 0; e < t.length; ++e) o[t[e]] = e
          if ('SUCCESS' !== n.state) r = [n, null]
          else {
            let e,
              n,
              s = Array(t.length).fill(null),
              u = 0
            for (;;) {
              let r = !1,
                i = null
              if (
                (([e, n] = this.processNextFile((t) => (t in o ? ((i = o[t]), !1) : ((r = !0), !0)))),
                'SUCCESS' !== e.state)
              )
                break
              if (!r && ((s[i] = n), ++u === t.length)) {
                e.reason = 'ERAR_END_ARCHIVE'
                break
              }
            }
            r = 'ERAR_END_ARCHIVE' !== e.reason ? [e, null] : [{ state: 'SUCCESS' }, { arcHeader: i, files: s }]
          }
          return this.closeArc(), r
        }
        fileCreated(t) {}
        close(t) {
          this._lastFileContent = this.closeFile(t)
        }
        openArc(t, e) {
          ;(n.Ext.current = this), (this._archive = new unpack.RarArchive())
          let r,
            i = this._archive.open(this._filePath, e || this._password, t)
          return (
            (r =
              0 !== i.state.errCode
                ? [this.getFailInfo(i.state.errCode, i.state.errType), null]
                : [
                    { state: 'SUCCESS' },
                    {
                      comment: i.comment,
                      flags: {
                        volume: 0 != (1 & i.flags),
                        lock: 0 != (4 & i.flags),
                        solid: 0 != (8 & i.flags),
                        authInfo: 0 != (32 & i.flags),
                        recoveryRecord: 0 != (64 & i.flags),
                        headerEncrypted: 0 != (128 & i.flags),
                      },
                    },
                  ]),
            (n.Ext.current = null),
            r
          )
        }
        processNextFile(t) {
          let e
          n.Ext.current = this
          let r = this._archive.getFileHeader(),
            i = [{ state: 'SUCCESS' }, null]
          if (0 === r.state.errCode) {
            let e = t(r.name)
            this._lastFileContent = null
            let n = this._archive.readFile(e)
            0 === n.errCode ||
              e ||
              ((i[0] = this.getFailInfo(n.errCode, n.errType)),
              22 === n.errCode ? (n = this._archive.readFile(!0)) : (n.errCode = 0)),
              0 === n.errCode
                ? (i[1] = this._lastFileContent)
                : ((r.state.errCode = n.errCode), (r.state.errType = n.errType)),
              (this._lastFileContent = null)
          }
          return (
            (e =
              0 !== r.state.errCode
                ? [this.getFailInfo(r.state.errCode, r.state.errType), null]
                : [
                    { state: 'SUCCESS' },
                    {
                      fileHeader: {
                        name: r.name,
                        flags: {
                          encrypted: 0 != (4 & r.flags),
                          solid: 0 != (16 & r.flags),
                          directory: 0 != (32 & r.flags),
                        },
                        packSize: r.packSize,
                        unpSize: r.unpSize,
                        crc: r.crc,
                        time: (function (t) {
                          const e = [5, 6, 5, 5, 4, 7]
                          let r = []
                          for (let n of e) r.push(t & ((1 << n) - 1)), (t >>= n)
                          let n = (t) => (t < 10 ? '0' + t : '' + t)
                          return (
                            `${1980 + (r = r.reverse())[0]}-${n(r[1])}-${n(r[2])}` +
                            `T${n(r[3])}:${n(r[4])}:${n(2 * r[5])}.000`
                          )
                        })(r.time),
                        unpVer: `${Math.floor(r.unpVer / 10)}.${r.unpVer % 10}`,
                        method: (function (t) {
                          return (
                            { 48: 'Storing', 49: 'Fastest', 50: 'Fast', 51: 'Normal', 52: 'Good', 53: 'Best' }[t] ||
                            'Unknown'
                          )
                        })(r.method),
                      },
                      extract: i,
                    },
                  ]),
            (n.Ext.current = null),
            e
          )
        }
        closeArc() {
          ;(n.Ext.current = this), this._archive.delete(), (n.Ext.current = null), (this._archive = null)
        }
        getFailInfo(t, e) {
          return { state: 'FAIL', reason: i[t], msg: o[t] }
        }
      }
      ;(s._current = null), (e.Extractor = s)
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }), (e.Ext = { current: null })
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (function (t) {
          for (var r in t) e.hasOwnProperty(r) || (e[r] = t[r])
        })(r(3))
      var n = r(1)
      e.Ext = n.Ext
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 })
      const n = r(4),
        i = r(6)
      ;(e.createExtractorFromData = function (t, e = '') {
        return new n.DataExtractor(t, e)
      }),
        (e.createExtractorFromFile = function (t, e = '', r = '') {
          return new i.FileExtractor(t, e, r)
        })
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 })
      const n = r(5),
        i = r(0)
      e.DataExtractor = class extends i.Extractor {
        constructor(t, e) {
          super(e), (this.dataFiles = {}), (this.dataFileMap = {}), (this.currentFd = 1)
          let r = { file: new n.DataFile(new Uint8Array(t)), fd: this.currentFd++ }
          ;(this._filePath = '_defaultUnrarJS_.rar'),
            (this.dataFiles[this._filePath] = r),
            (this.dataFileMap[r.fd] = this._filePath)
        }
        open(t) {
          let e = this.dataFiles[t]
          return e ? e.fd : 0
        }
        create(t) {
          let e = this.currentFd++
          return (this.dataFiles[t] = { file: new n.DataFile(), fd: this.currentFd++ }), (this.dataFileMap[e] = t), e
        }
        closeFile(t) {
          let e = this.dataFiles[this.dataFileMap[t]]
          if (!e) return null
          let r = e.file.readAll()
          return (
            1 !== t ? (delete this.dataFiles[this.dataFileMap[t]], delete this.dataFileMap[t]) : e.file.seek(0, 'SET'),
            r
          )
        }
        read(t, e, r) {
          let n = this.dataFiles[this.dataFileMap[t]]
          if (!n) return -1
          let i = n.file.read(r)
          return null === i ? -1 : (unpack.HEAPU8.set(i, e), i.byteLength)
        }
        write(t, e, r) {
          let n = this.dataFiles[this.dataFileMap[t]]
          return !!n && (n.file.write(unpack.HEAPU8.slice(e, e + r)), !0)
        }
        tell(t) {
          let e = this.dataFiles[this.dataFileMap[t]]
          return e ? e.file.tell() : -1
        }
        seek(t, e, r) {
          let n = this.dataFiles[this.dataFileMap[t]]
          return !!n && n.file.seek(e, r)
        }
      }
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 })
      e.DataFile = class {
        constructor(t) {
          ;(this.buffers = []),
            (this.pos = 0),
            (this.size = 0),
            t && (this.buffers.push(t), (this.size = t.byteLength), (this.pos = 0))
        }
        read(t) {
          if ((this.flatten(), t + this.pos > this.size)) return null
          let e = this.pos
          return (this.pos += t), this.buffers[0].slice(e, this.pos)
        }
        readAll() {
          return this.flatten(), this.buffers[0]
        }
        write(t) {
          return this.buffers.push(t), (this.size += t.byteLength), (this.pos += t.byteLength), !0
        }
        tell() {
          return this.pos
        }
        seek(t, e) {
          let r = this.pos
          return (
            'SET' === e ? (r = t) : 'CUR' === e ? (r += t) : (r = this.size - t),
            !(r < 0 || r > this.size || ((this.pos = r), 0))
          )
        }
        flatten() {
          if (this.buffers.length <= 1) return
          let t = new Uint8Array(this.size),
            e = 0
          for (let r of this.buffers) t.set(r, e), (e += r.byteLength)
          this.buffers = [t]
        }
      }
    },
    function (t, e, r) {
      'use strict'
      ;(function (t) {
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(12),
          i = r(13),
          o = r(0)
        e.FileExtractor = class extends o.Extractor {
          constructor(t, e, r) {
            super(r), (this._filePath = t), (this.fileMap = {}), (this._target = e)
          }
          open(t) {
            let e = n.openSync(t, 'r')
            return (this.fileMap[e] = { size: n.fstatSync(e).size, pos: 0, name: t }), e
          }
          create(t) {
            let e = i.join(this._target, t)
            i.parse(e)
              .dir.split('/')
              .reduce((t, e) => ((t += e + '/'), n.existsSync(t) || n.mkdirSync(t), t), '')
            let r = n.openSync(e, 'w')
            return (this.fileMap[r] = { size: 0, pos: 0, name: t }), r
          }
          closeFile(t) {
            return delete this.fileMap[t], n.closeSync(t), null
          }
          read(e, r, i) {
            let o = this.fileMap[e],
              s = new t(i),
              u = n.readSync(e, s, 0, i, o.pos)
            return unpack.HEAPU8.set(s, r), (o.pos += u), u
          }
          write(e, r, i) {
            let o = this.fileMap[e],
              s = n.writeSync(e, new t(unpack.HEAPU8.subarray(r, r + i)), 0, i)
            return (o.pos += s), (o.size += s), s === i
          }
          tell(t) {
            return this.fileMap[t].pos
          }
          seek(t, e, r) {
            let n = this.fileMap[t],
              i = n.pos
            return (
              'SET' === r ? (i = 0) : 'END' === r && (i = n.size), !((i += e) < 0 || i > n.size || ((n.pos = i), 0))
            )
          }
        }
      }.call(this, r(7).Buffer))
    },
    function (t, e, r) {
      'use strict'
      ;(function (t) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
         * @license  MIT
         */
        var n = r(9),
          i = r(10),
          o = r(11)
        function s() {
          return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function u(t, e) {
          if (s() < e) throw new RangeError('Invalid typed array length')
          return (
            a.TYPED_ARRAY_SUPPORT
              ? ((t = new Uint8Array(e)).__proto__ = a.prototype)
              : (null === t && (t = new a(e)), (t.length = e)),
            t
          )
        }
        function a(t, e, r) {
          if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a)) return new a(t, e, r)
          if ('number' == typeof t) {
            if ('string' == typeof e)
              throw new Error('If encoding is specified then the first argument must be a string')
            return l(this, t)
          }
          return f(this, t, e, r)
        }
        function f(t, e, r, n) {
          if ('number' == typeof e) throw new TypeError('"value" argument must not be a number')
          return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
            ? (function (t, e, r, n) {
                if ((e.byteLength, r < 0 || e.byteLength < r)) throw new RangeError("'offset' is out of bounds")
                if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds")
                e =
                  void 0 === r && void 0 === n
                    ? new Uint8Array(e)
                    : void 0 === n
                    ? new Uint8Array(e, r)
                    : new Uint8Array(e, r, n)
                a.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = a.prototype) : (t = c(t, e))
                return t
              })(t, e, r, n)
            : 'string' == typeof e
            ? (function (t, e, r) {
                ;('string' == typeof r && '' !== r) || (r = 'utf8')
                if (!a.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding')
                var n = 0 | g(e, r),
                  i = (t = u(t, n)).write(e, r)
                i !== n && (t = t.slice(0, i))
                return t
              })(t, e, r)
            : (function (t, e) {
                if (a.isBuffer(e)) {
                  var r = 0 | p(e.length)
                  return 0 === (t = u(t, r)).length ? t : (e.copy(t, 0, 0, r), t)
                }
                if (e) {
                  if (('undefined' != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || 'length' in e)
                    return 'number' != typeof e.length ||
                      (function (t) {
                        return t != t
                      })(e.length)
                      ? u(t, 0)
                      : c(t, e)
                  if ('Buffer' === e.type && o(e.data)) return c(t, e.data)
                }
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                )
              })(t, e)
        }
        function h(t) {
          if ('number' != typeof t) throw new TypeError('"size" argument must be a number')
          if (t < 0) throw new RangeError('"size" argument must not be negative')
        }
        function l(t, e) {
          if ((h(e), (t = u(t, e < 0 ? 0 : 0 | p(e))), !a.TYPED_ARRAY_SUPPORT)) for (var r = 0; r < e; ++r) t[r] = 0
          return t
        }
        function c(t, e) {
          var r = e.length < 0 ? 0 : 0 | p(e.length)
          t = u(t, r)
          for (var n = 0; n < r; n += 1) t[n] = 255 & e[n]
          return t
        }
        function p(t) {
          if (t >= s())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' + s().toString(16) + ' bytes'
            )
          return 0 | t
        }
        function g(t, e) {
          if (a.isBuffer(t)) return t.length
          if (
            'undefined' != typeof ArrayBuffer &&
            'function' == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
          )
            return t.byteLength
          'string' != typeof t && (t = '' + t)
          var r = t.length
          if (0 === r) return 0
          for (var n = !1; ; )
            switch (e) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return r
              case 'utf8':
              case 'utf-8':
              case void 0:
                return k(t).length
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * r
              case 'hex':
                return r >>> 1
              case 'base64':
                return j(t).length
              default:
                if (n) return k(t).length
                ;(e = ('' + e).toLowerCase()), (n = !0)
            }
        }
        function d(t, e, r) {
          var n = t[e]
          ;(t[e] = t[r]), (t[r] = n)
        }
        function y(t, e, r, n, i) {
          if (0 === t.length) return -1
          if (
            ('string' == typeof r
              ? ((n = r), (r = 0))
              : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
            (r = +r),
            isNaN(r) && (r = i ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length)
          ) {
            if (i) return -1
            r = t.length - 1
          } else if (r < 0) {
            if (!i) return -1
            r = 0
          }
          if (('string' == typeof e && (e = a.from(e, n)), a.isBuffer(e))) return 0 === e.length ? -1 : w(t, e, r, n, i)
          if ('number' == typeof e)
            return (
              (e &= 255),
              a.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, e, r)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                : w(t, [e], r, n, i)
            )
          throw new TypeError('val must be string, number or Buffer')
        }
        function w(t, e, r, n, i) {
          var o,
            s = 1,
            u = t.length,
            a = e.length
          if (
            void 0 !== n &&
            ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1
            ;(s = 2), (u /= 2), (a /= 2), (r /= 2)
          }
          function f(t, e) {
            return 1 === s ? t[e] : t.readUInt16BE(e * s)
          }
          if (i) {
            var h = -1
            for (o = r; o < u; o++)
              if (f(t, o) === f(e, -1 === h ? 0 : o - h)) {
                if ((-1 === h && (h = o), o - h + 1 === a)) return h * s
              } else -1 !== h && (o -= o - h), (h = -1)
          } else
            for (r + a > u && (r = u - a), o = r; o >= 0; o--) {
              for (var l = !0, c = 0; c < a; c++)
                if (f(t, o + c) !== f(e, c)) {
                  l = !1
                  break
                }
              if (l) return o
            }
          return -1
        }
        function E(t, e, r, n) {
          r = Number(r) || 0
          var i = t.length - r
          n ? (n = Number(n)) > i && (n = i) : (n = i)
          var o = e.length
          if (o % 2 != 0) throw new TypeError('Invalid hex string')
          n > o / 2 && (n = o / 2)
          for (var s = 0; s < n; ++s) {
            var u = parseInt(e.substr(2 * s, 2), 16)
            if (isNaN(u)) return s
            t[r + s] = u
          }
          return s
        }
        function v(t, e, r, n) {
          return z(k(e, t.length - r), t, r, n)
        }
        function A(t, e, r, n) {
          return z(
            (function (t) {
              for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r))
              return e
            })(e),
            t,
            r,
            n
          )
        }
        function _(t, e, r, n) {
          return A(t, e, r, n)
        }
        function b(t, e, r, n) {
          return z(j(e), t, r, n)
        }
        function m(t, e, r, n) {
          return z(
            (function (t, e) {
              for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
                (r = t.charCodeAt(s)), (n = r >> 8), (i = r % 256), o.push(i), o.push(n)
              return o
            })(e, t.length - r),
            t,
            r,
            n
          )
        }
        function R(t, e, r) {
          return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r))
        }
        function S(t, e, r) {
          r = Math.min(t.length, r)
          for (var n = [], i = e; i < r; ) {
            var o,
              s,
              u,
              a,
              f = t[i],
              h = null,
              l = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1
            if (i + l <= r)
              switch (l) {
                case 1:
                  f < 128 && (h = f)
                  break
                case 2:
                  128 == (192 & (o = t[i + 1])) && (a = ((31 & f) << 6) | (63 & o)) > 127 && (h = a)
                  break
                case 3:
                  ;(o = t[i + 1]),
                    (s = t[i + 2]),
                    128 == (192 & o) &&
                      128 == (192 & s) &&
                      (a = ((15 & f) << 12) | ((63 & o) << 6) | (63 & s)) > 2047 &&
                      (a < 55296 || a > 57343) &&
                      (h = a)
                  break
                case 4:
                  ;(o = t[i + 1]),
                    (s = t[i + 2]),
                    (u = t[i + 3]),
                    128 == (192 & o) &&
                      128 == (192 & s) &&
                      128 == (192 & u) &&
                      (a = ((15 & f) << 18) | ((63 & o) << 12) | ((63 & s) << 6) | (63 & u)) > 65535 &&
                      a < 1114112 &&
                      (h = a)
              }
            null === h
              ? ((h = 65533), (l = 1))
              : h > 65535 && ((h -= 65536), n.push(((h >>> 10) & 1023) | 55296), (h = 56320 | (1023 & h))),
              n.push(h),
              (i += l)
          }
          return (function (t) {
            var e = t.length
            if (e <= T) return String.fromCharCode.apply(String, t)
            var r = '',
              n = 0
            for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += T)))
            return r
          })(n)
        }
        ;(e.Buffer = a),
          (e.SlowBuffer = function (t) {
            ;+t != t && (t = 0)
            return a.alloc(+t)
          }),
          (e.INSPECT_MAX_BYTES = 50),
          (a.TYPED_ARRAY_SUPPORT =
            void 0 !== t.TYPED_ARRAY_SUPPORT
              ? t.TYPED_ARRAY_SUPPORT
              : (function () {
                  try {
                    var t = new Uint8Array(1)
                    return (
                      (t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function () {
                          return 42
                        },
                      }),
                      42 === t.foo() && 'function' == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    )
                  } catch (t) {
                    return !1
                  }
                })()),
          (e.kMaxLength = s()),
          (a.poolSize = 8192),
          (a._augment = function (t) {
            return (t.__proto__ = a.prototype), t
          }),
          (a.from = function (t, e, r) {
            return f(null, t, e, r)
          }),
          a.TYPED_ARRAY_SUPPORT &&
            ((a.prototype.__proto__ = Uint8Array.prototype),
            (a.__proto__ = Uint8Array),
            'undefined' != typeof Symbol &&
              Symbol.species &&
              a[Symbol.species] === a &&
              Object.defineProperty(a, Symbol.species, { value: null, configurable: !0 })),
          (a.alloc = function (t, e, r) {
            return (function (t, e, r, n) {
              return (
                h(e),
                e <= 0
                  ? u(t, e)
                  : void 0 !== r
                  ? 'string' == typeof n
                    ? u(t, e).fill(r, n)
                    : u(t, e).fill(r)
                  : u(t, e)
              )
            })(null, t, e, r)
          }),
          (a.allocUnsafe = function (t) {
            return l(null, t)
          }),
          (a.allocUnsafeSlow = function (t) {
            return l(null, t)
          }),
          (a.isBuffer = function (t) {
            return !(null == t || !t._isBuffer)
          }),
          (a.compare = function (t, e) {
            if (!a.isBuffer(t) || !a.isBuffer(e)) throw new TypeError('Arguments must be Buffers')
            if (t === e) return 0
            for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
              if (t[i] !== e[i]) {
                ;(r = t[i]), (n = e[i])
                break
              }
            return r < n ? -1 : n < r ? 1 : 0
          }),
          (a.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0
              default:
                return !1
            }
          }),
          (a.concat = function (t, e) {
            if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers')
            if (0 === t.length) return a.alloc(0)
            var r
            if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length
            var n = a.allocUnsafe(e),
              i = 0
            for (r = 0; r < t.length; ++r) {
              var s = t[r]
              if (!a.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers')
              s.copy(n, i), (i += s.length)
            }
            return n
          }),
          (a.byteLength = g),
          (a.prototype._isBuffer = !0),
          (a.prototype.swap16 = function () {
            var t = this.length
            if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
            for (var e = 0; e < t; e += 2) d(this, e, e + 1)
            return this
          }),
          (a.prototype.swap32 = function () {
            var t = this.length
            if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
            for (var e = 0; e < t; e += 4) d(this, e, e + 3), d(this, e + 1, e + 2)
            return this
          }),
          (a.prototype.swap64 = function () {
            var t = this.length
            if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
            for (var e = 0; e < t; e += 8)
              d(this, e, e + 7), d(this, e + 1, e + 6), d(this, e + 2, e + 5), d(this, e + 3, e + 4)
            return this
          }),
          (a.prototype.toString = function () {
            var t = 0 | this.length
            return 0 === t
              ? ''
              : 0 === arguments.length
              ? S(this, 0, t)
              : function (t, e, r) {
                  var n = !1
                  if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return ''
                  if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return ''
                  if ((r >>>= 0) <= (e >>>= 0)) return ''
                  for (t || (t = 'utf8'); ; )
                    switch (t) {
                      case 'hex':
                        return U(this, e, r)
                      case 'utf8':
                      case 'utf-8':
                        return S(this, e, r)
                      case 'ascii':
                        return P(this, e, r)
                      case 'latin1':
                      case 'binary':
                        return C(this, e, r)
                      case 'base64':
                        return R(this, e, r)
                      case 'ucs2':
                      case 'ucs-2':
                      case 'utf16le':
                      case 'utf-16le':
                        return B(this, e, r)
                      default:
                        if (n) throw new TypeError('Unknown encoding: ' + t)
                        ;(t = (t + '').toLowerCase()), (n = !0)
                    }
                }.apply(this, arguments)
          }),
          (a.prototype.equals = function (t) {
            if (!a.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
            return this === t || 0 === a.compare(this, t)
          }),
          (a.prototype.inspect = function () {
            var t = '',
              r = e.INSPECT_MAX_BYTES
            return (
              this.length > 0 &&
                ((t = this.toString('hex', 0, r).match(/.{2}/g).join(' ')), this.length > r && (t += ' ... ')),
              '<Buffer ' + t + '>'
            )
          }),
          (a.prototype.compare = function (t, e, r, n, i) {
            if (!a.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              e < 0 || r > t.length || n < 0 || i > this.length)
            )
              throw new RangeError('out of range index')
            if (n >= i && e >= r) return 0
            if (n >= i) return -1
            if (e >= r) return 1
            if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === t)) return 0
            for (
              var o = i - n, s = r - e, u = Math.min(o, s), f = this.slice(n, i), h = t.slice(e, r), l = 0;
              l < u;
              ++l
            )
              if (f[l] !== h[l]) {
                ;(o = f[l]), (s = h[l])
                break
              }
            return o < s ? -1 : s < o ? 1 : 0
          }),
          (a.prototype.includes = function (t, e, r) {
            return -1 !== this.indexOf(t, e, r)
          }),
          (a.prototype.indexOf = function (t, e, r) {
            return y(this, t, e, r, !0)
          }),
          (a.prototype.lastIndexOf = function (t, e, r) {
            return y(this, t, e, r, !1)
          }),
          (a.prototype.write = function (t, e, r, n) {
            if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0)
            else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0)
            else {
              if (!isFinite(e))
                throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
              ;(e |= 0), isFinite(r) ? ((r |= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0))
            }
            var i = this.length - e
            if (((void 0 === r || r > i) && (r = i), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
              throw new RangeError('Attempt to write outside buffer bounds')
            n || (n = 'utf8')
            for (var o = !1; ; )
              switch (n) {
                case 'hex':
                  return E(this, t, e, r)
                case 'utf8':
                case 'utf-8':
                  return v(this, t, e, r)
                case 'ascii':
                  return A(this, t, e, r)
                case 'latin1':
                case 'binary':
                  return _(this, t, e, r)
                case 'base64':
                  return b(this, t, e, r)
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return m(this, t, e, r)
                default:
                  if (o) throw new TypeError('Unknown encoding: ' + n)
                  ;(n = ('' + n).toLowerCase()), (o = !0)
              }
          }),
          (a.prototype.toJSON = function () {
            return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
          })
        var T = 4096
        function P(t, e, r) {
          var n = ''
          r = Math.min(t.length, r)
          for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i])
          return n
        }
        function C(t, e, r) {
          var n = ''
          r = Math.min(t.length, r)
          for (var i = e; i < r; ++i) n += String.fromCharCode(t[i])
          return n
        }
        function U(t, e, r) {
          var n = t.length
          ;(!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n)
          for (var i = '', o = e; o < r; ++o) i += N(t[o])
          return i
        }
        function B(t, e, r) {
          for (var n = t.slice(e, r), i = '', o = 0; o < n.length; o += 2)
            i += String.fromCharCode(n[o] + 256 * n[o + 1])
          return i
        }
        function F(t, e, r) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint')
          if (t + e > r) throw new RangeError('Trying to access beyond buffer length')
        }
        function M(t, e, r, n, i, o) {
          if (!a.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
          if (e > i || e < o) throw new RangeError('"value" argument is out of bounds')
          if (r + n > t.length) throw new RangeError('Index out of range')
        }
        function x(t, e, r, n) {
          e < 0 && (e = 65535 + e + 1)
          for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
            t[r + i] = (e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i))
        }
        function I(t, e, r, n) {
          e < 0 && (e = 4294967295 + e + 1)
          for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i) t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255
        }
        function O(t, e, r, n, i, o) {
          if (r + n > t.length) throw new RangeError('Index out of range')
          if (r < 0) throw new RangeError('Index out of range')
        }
        function Y(t, e, r, n, o) {
          return o || O(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4
        }
        function L(t, e, r, n, o) {
          return o || O(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8
        }
        ;(a.prototype.slice = function (t, e) {
          var r,
            n = this.length
          if (
            ((t = ~~t),
            (e = void 0 === e ? n : ~~e),
            t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
            e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
            e < t && (e = t),
            a.TYPED_ARRAY_SUPPORT)
          )
            (r = this.subarray(t, e)).__proto__ = a.prototype
          else {
            var i = e - t
            r = new a(i, void 0)
            for (var o = 0; o < i; ++o) r[o] = this[o + t]
          }
          return r
        }),
          (a.prototype.readUIntLE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || F(t, e, this.length)
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); ) n += this[t + o] * i
            return n
          }),
          (a.prototype.readUIntBE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || F(t, e, this.length)
            for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); ) n += this[t + --e] * i
            return n
          }),
          (a.prototype.readUInt8 = function (t, e) {
            return e || F(t, 1, this.length), this[t]
          }),
          (a.prototype.readUInt16LE = function (t, e) {
            return e || F(t, 2, this.length), this[t] | (this[t + 1] << 8)
          }),
          (a.prototype.readUInt16BE = function (t, e) {
            return e || F(t, 2, this.length), (this[t] << 8) | this[t + 1]
          }),
          (a.prototype.readUInt32LE = function (t, e) {
            return (
              e || F(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
            )
          }),
          (a.prototype.readUInt32BE = function (t, e) {
            return (
              e || F(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            )
          }),
          (a.prototype.readIntLE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || F(t, e, this.length)
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); ) n += this[t + o] * i
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n
          }),
          (a.prototype.readIntBE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || F(t, e, this.length)
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256); ) o += this[t + --n] * i
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
          }),
          (a.prototype.readInt8 = function (t, e) {
            return e || F(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          }),
          (a.prototype.readInt16LE = function (t, e) {
            e || F(t, 2, this.length)
            var r = this[t] | (this[t + 1] << 8)
            return 32768 & r ? 4294901760 | r : r
          }),
          (a.prototype.readInt16BE = function (t, e) {
            e || F(t, 2, this.length)
            var r = this[t + 1] | (this[t] << 8)
            return 32768 & r ? 4294901760 | r : r
          }),
          (a.prototype.readInt32LE = function (t, e) {
            return e || F(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
          }),
          (a.prototype.readInt32BE = function (t, e) {
            return e || F(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
          }),
          (a.prototype.readFloatLE = function (t, e) {
            return e || F(t, 4, this.length), i.read(this, t, !0, 23, 4)
          }),
          (a.prototype.readFloatBE = function (t, e) {
            return e || F(t, 4, this.length), i.read(this, t, !1, 23, 4)
          }),
          (a.prototype.readDoubleLE = function (t, e) {
            return e || F(t, 8, this.length), i.read(this, t, !0, 52, 8)
          }),
          (a.prototype.readDoubleBE = function (t, e) {
            return e || F(t, 8, this.length), i.read(this, t, !1, 52, 8)
          }),
          (a.prototype.writeUIntLE = function (t, e, r, n) {
            ;((t = +t), (e |= 0), (r |= 0), n) || M(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
            var i = 1,
              o = 0
            for (this[e] = 255 & t; ++o < r && (i *= 256); ) this[e + o] = (t / i) & 255
            return e + r
          }),
          (a.prototype.writeUIntBE = function (t, e, r, n) {
            ;((t = +t), (e |= 0), (r |= 0), n) || M(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
            var i = r - 1,
              o = 1
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); ) this[e + i] = (t / o) & 255
            return e + r
          }),
          (a.prototype.writeUInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 1, 255, 0),
              a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              (this[e] = 255 & t),
              e + 1
            )
          }),
          (a.prototype.writeUInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 2, 65535, 0),
              a.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : x(this, t, e, !0),
              e + 2
            )
          }),
          (a.prototype.writeUInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 2, 65535, 0),
              a.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : x(this, t, e, !1),
              e + 2
            )
          }),
          (a.prototype.writeUInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 4, 4294967295, 0),
              a.TYPED_ARRAY_SUPPORT
                ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t))
                : I(this, t, e, !0),
              e + 4
            )
          }),
          (a.prototype.writeUInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 4, 4294967295, 0),
              a.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
                : I(this, t, e, !1),
              e + 4
            )
          }),
          (a.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e |= 0), !n)) {
              var i = Math.pow(2, 8 * r - 1)
              M(this, t, e, r, i - 1, -i)
            }
            var o = 0,
              s = 1,
              u = 0
            for (this[e] = 255 & t; ++o < r && (s *= 256); )
              t < 0 && 0 === u && 0 !== this[e + o - 1] && (u = 1), (this[e + o] = (((t / s) >> 0) - u) & 255)
            return e + r
          }),
          (a.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e |= 0), !n)) {
              var i = Math.pow(2, 8 * r - 1)
              M(this, t, e, r, i - 1, -i)
            }
            var o = r - 1,
              s = 1,
              u = 0
            for (this[e + o] = 255 & t; --o >= 0 && (s *= 256); )
              t < 0 && 0 === u && 0 !== this[e + o + 1] && (u = 1), (this[e + o] = (((t / s) >> 0) - u) & 255)
            return e + r
          }),
          (a.prototype.writeInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 1, 127, -128),
              a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            )
          }),
          (a.prototype.writeInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 2, 32767, -32768),
              a.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : x(this, t, e, !0),
              e + 2
            )
          }),
          (a.prototype.writeInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 2, 32767, -32768),
              a.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : x(this, t, e, !1),
              e + 2
            )
          }),
          (a.prototype.writeInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 4, 2147483647, -2147483648),
              a.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24))
                : I(this, t, e, !0),
              e + 4
            )
          }),
          (a.prototype.writeInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e |= 0),
              r || M(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              a.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
                : I(this, t, e, !1),
              e + 4
            )
          }),
          (a.prototype.writeFloatLE = function (t, e, r) {
            return Y(this, t, e, !0, r)
          }),
          (a.prototype.writeFloatBE = function (t, e, r) {
            return Y(this, t, e, !1, r)
          }),
          (a.prototype.writeDoubleLE = function (t, e, r) {
            return L(this, t, e, !0, r)
          }),
          (a.prototype.writeDoubleBE = function (t, e, r) {
            return L(this, t, e, !1, r)
          }),
          (a.prototype.copy = function (t, e, r, n) {
            if (
              (r || (r = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0
            if (0 === t.length || 0 === this.length) return 0
            if (e < 0) throw new RangeError('targetStart out of bounds')
            if (r < 0 || r >= this.length) throw new RangeError('sourceStart out of bounds')
            if (n < 0) throw new RangeError('sourceEnd out of bounds')
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r)
            var i,
              o = n - r
            if (this === t && r < e && e < n) for (i = o - 1; i >= 0; --i) t[i + e] = this[i + r]
            else if (o < 1e3 || !a.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) t[i + e] = this[i + r]
            else Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e)
            return o
          }),
          (a.prototype.fill = function (t, e, r, n) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof e
                  ? ((n = e), (e = 0), (r = this.length))
                  : 'string' == typeof r && ((n = r), (r = this.length)),
                1 === t.length)
              ) {
                var i = t.charCodeAt(0)
                i < 256 && (t = i)
              }
              if (void 0 !== n && 'string' != typeof n) throw new TypeError('encoding must be a string')
              if ('string' == typeof n && !a.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n)
            } else 'number' == typeof t && (t &= 255)
            if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index')
            if (r <= e) return this
            var o
            if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
              for (o = e; o < r; ++o) this[o] = t
            else {
              var s = a.isBuffer(t) ? t : k(new a(t, n).toString()),
                u = s.length
              for (o = 0; o < r - e; ++o) this[o + e] = s[o % u]
            }
            return this
          })
        var D = /[^+\/0-9A-Za-z-_]/g
        function N(t) {
          return t < 16 ? '0' + t.toString(16) : t.toString(16)
        }
        function k(t, e) {
          var r
          e = e || 1 / 0
          for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
            if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
              if (!i) {
                if (r > 56319) {
                  ;(e -= 3) > -1 && o.push(239, 191, 189)
                  continue
                }
                if (s + 1 === n) {
                  ;(e -= 3) > -1 && o.push(239, 191, 189)
                  continue
                }
                i = r
                continue
              }
              if (r < 56320) {
                ;(e -= 3) > -1 && o.push(239, 191, 189), (i = r)
                continue
              }
              r = 65536 + (((i - 55296) << 10) | (r - 56320))
            } else i && (e -= 3) > -1 && o.push(239, 191, 189)
            if (((i = null), r < 128)) {
              if ((e -= 1) < 0) break
              o.push(r)
            } else if (r < 2048) {
              if ((e -= 2) < 0) break
              o.push((r >> 6) | 192, (63 & r) | 128)
            } else if (r < 65536) {
              if ((e -= 3) < 0) break
              o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128)
            } else {
              if (!(r < 1114112)) throw new Error('Invalid code point')
              if ((e -= 4) < 0) break
              o.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128)
            }
          }
          return o
        }
        function j(t) {
          return n.toByteArray(
            (function (t) {
              if (
                (t = (function (t) {
                  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
                })(t).replace(D, '')).length < 2
              )
                return ''
              for (; t.length % 4 != 0; ) t += '='
              return t
            })(t)
          )
        }
        function z(t, e, r, n) {
          for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i]
          return i
        }
      }.call(this, r(8)))
    },
    function (t, e) {
      var r
      r = (function () {
        return this
      })()
      try {
        r = r || Function('return this')() || (0, eval)('this')
      } catch (t) {
        'object' == typeof window && (r = window)
      }
      t.exports = r
    },
    function (t, e, r) {
      'use strict'
      ;(e.byteLength = function (t) {
        var e = f(t),
          r = e[0],
          n = e[1]
        return (3 * (r + n)) / 4 - n
      }),
        (e.toByteArray = function (t) {
          for (
            var e,
              r = f(t),
              n = r[0],
              s = r[1],
              u = new o(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r
                })(0, n, s)
              ),
              a = 0,
              h = s > 0 ? n - 4 : n,
              l = 0;
            l < h;
            l += 4
          )
            (e =
              (i[t.charCodeAt(l)] << 18) |
              (i[t.charCodeAt(l + 1)] << 12) |
              (i[t.charCodeAt(l + 2)] << 6) |
              i[t.charCodeAt(l + 3)]),
              (u[a++] = (e >> 16) & 255),
              (u[a++] = (e >> 8) & 255),
              (u[a++] = 255 & e)
          2 === s && ((e = (i[t.charCodeAt(l)] << 2) | (i[t.charCodeAt(l + 1)] >> 4)), (u[a++] = 255 & e))
          1 === s &&
            ((e = (i[t.charCodeAt(l)] << 10) | (i[t.charCodeAt(l + 1)] << 4) | (i[t.charCodeAt(l + 2)] >> 2)),
            (u[a++] = (e >> 8) & 255),
            (u[a++] = 255 & e))
          return u
        }),
        (e.fromByteArray = function (t) {
          for (var e, r = t.length, i = r % 3, o = [], s = 0, u = r - i; s < u; s += 16383)
            o.push(l(t, s, s + 16383 > u ? u : s + 16383))
          1 === i
            ? ((e = t[r - 1]), o.push(n[e >> 2] + n[(e << 4) & 63] + '=='))
            : 2 === i &&
              ((e = (t[r - 2] << 8) + t[r - 1]), o.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + '='))
          return o.join('')
        })
      for (
        var n = [],
          i = [],
          o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
          s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          u = 0,
          a = s.length;
        u < a;
        ++u
      )
        (n[u] = s[u]), (i[s.charCodeAt(u)] = u)
      function f(t) {
        var e = t.length
        if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
        var r = t.indexOf('=')
        return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)]
      }
      function h(t) {
        return n[(t >> 18) & 63] + n[(t >> 12) & 63] + n[(t >> 6) & 63] + n[63 & t]
      }
      function l(t, e, r) {
        for (var n, i = [], o = e; o < r; o += 3)
          (n = ((t[o] << 16) & 16711680) + ((t[o + 1] << 8) & 65280) + (255 & t[o + 2])), i.push(h(n))
        return i.join('')
      }
      ;(i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63)
    },
    function (t, e) {
      ;(e.read = function (t, e, r, n, i) {
        var o,
          s,
          u = 8 * i - n - 1,
          a = (1 << u) - 1,
          f = a >> 1,
          h = -7,
          l = r ? i - 1 : 0,
          c = r ? -1 : 1,
          p = t[e + l]
        for (l += c, o = p & ((1 << -h) - 1), p >>= -h, h += u; h > 0; o = 256 * o + t[e + l], l += c, h -= 8);
        for (s = o & ((1 << -h) - 1), o >>= -h, h += n; h > 0; s = 256 * s + t[e + l], l += c, h -= 8);
        if (0 === o) o = 1 - f
        else {
          if (o === a) return s ? NaN : (1 / 0) * (p ? -1 : 1)
          ;(s += Math.pow(2, n)), (o -= f)
        }
        return (p ? -1 : 1) * s * Math.pow(2, o - n)
      }),
        (e.write = function (t, e, r, n, i, o) {
          var s,
            u,
            a,
            f = 8 * o - i - 1,
            h = (1 << f) - 1,
            l = h >> 1,
            c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = n ? 0 : o - 1,
            g = n ? 1 : -1,
            d = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0
          for (
            e = Math.abs(e),
              isNaN(e) || e === 1 / 0
                ? ((u = isNaN(e) ? 1 : 0), (s = h))
                : ((s = Math.floor(Math.log(e) / Math.LN2)),
                  e * (a = Math.pow(2, -s)) < 1 && (s--, (a *= 2)),
                  (e += s + l >= 1 ? c / a : c * Math.pow(2, 1 - l)) * a >= 2 && (s++, (a /= 2)),
                  s + l >= h
                    ? ((u = 0), (s = h))
                    : s + l >= 1
                    ? ((u = (e * a - 1) * Math.pow(2, i)), (s += l))
                    : ((u = e * Math.pow(2, l - 1) * Math.pow(2, i)), (s = 0)));
            i >= 8;
            t[r + p] = 255 & u, p += g, u /= 256, i -= 8
          );
          for (s = (s << i) | u, f += i; f > 0; t[r + p] = 255 & s, p += g, s /= 256, f -= 8);
          t[r + p - g] |= 128 * d
        })
    },
    function (t, e) {
      var r = {}.toString
      t.exports =
        Array.isArray ||
        function (t) {
          return '[object Array]' == r.call(t)
        }
    },
    function (e, r) {
      e.exports = t
    },
    function (t, e, r) {
      ;(function (t) {
        function r(t, e) {
          for (var r = 0, n = t.length - 1; n >= 0; n--) {
            var i = t[n]
            '.' === i ? t.splice(n, 1) : '..' === i ? (t.splice(n, 1), r++) : r && (t.splice(n, 1), r--)
          }
          if (e) for (; r--; r) t.unshift('..')
          return t
        }
        var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
          i = function (t) {
            return n.exec(t).slice(1)
          }
        function o(t, e) {
          if (t.filter) return t.filter(e)
          for (var r = [], n = 0; n < t.length; n++) e(t[n], n, t) && r.push(t[n])
          return r
        }
        ;(e.resolve = function () {
          for (var e = '', n = !1, i = arguments.length - 1; i >= -1 && !n; i--) {
            var s = i >= 0 ? arguments[i] : t.cwd()
            if ('string' != typeof s) throw new TypeError('Arguments to path.resolve must be strings')
            s && ((e = s + '/' + e), (n = '/' === s.charAt(0)))
          }
          return (
            (e = r(
              o(e.split('/'), function (t) {
                return !!t
              }),
              !n
            ).join('/')),
            (n ? '/' : '') + e || '.'
          )
        }),
          (e.normalize = function (t) {
            var n = e.isAbsolute(t),
              i = '/' === s(t, -1)
            return (
              (t = r(
                o(t.split('/'), function (t) {
                  return !!t
                }),
                !n
              ).join('/')) ||
                n ||
                (t = '.'),
              t && i && (t += '/'),
              (n ? '/' : '') + t
            )
          }),
          (e.isAbsolute = function (t) {
            return '/' === t.charAt(0)
          }),
          (e.join = function () {
            var t = Array.prototype.slice.call(arguments, 0)
            return e.normalize(
              o(t, function (t, e) {
                if ('string' != typeof t) throw new TypeError('Arguments to path.join must be strings')
                return t
              }).join('/')
            )
          }),
          (e.relative = function (t, r) {
            function n(t) {
              for (var e = 0; e < t.length && '' === t[e]; e++);
              for (var r = t.length - 1; r >= 0 && '' === t[r]; r--);
              return e > r ? [] : t.slice(e, r - e + 1)
            }
            ;(t = e.resolve(t).substr(1)), (r = e.resolve(r).substr(1))
            for (
              var i = n(t.split('/')), o = n(r.split('/')), s = Math.min(i.length, o.length), u = s, a = 0;
              a < s;
              a++
            )
              if (i[a] !== o[a]) {
                u = a
                break
              }
            var f = []
            for (a = u; a < i.length; a++) f.push('..')
            return (f = f.concat(o.slice(u))).join('/')
          }),
          (e.sep = '/'),
          (e.delimiter = ':'),
          (e.dirname = function (t) {
            var e = i(t),
              r = e[0],
              n = e[1]
            return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : '.'
          }),
          (e.basename = function (t, e) {
            var r = i(t)[2]
            return e && r.substr(-1 * e.length) === e && (r = r.substr(0, r.length - e.length)), r
          }),
          (e.extname = function (t) {
            return i(t)[3]
          })
        var s =
          'b' === 'ab'.substr(-1)
            ? function (t, e, r) {
                return t.substr(e, r)
              }
            : function (t, e, r) {
                return e < 0 && (e = t.length + e), t.substr(e, r)
              }
      }.call(this, r(14)))
    },
    function (t, e) {
      var r,
        n,
        i = (t.exports = {})
      function o() {
        throw new Error('setTimeout has not been defined')
      }
      function s() {
        throw new Error('clearTimeout has not been defined')
      }
      function u(t) {
        if (r === setTimeout) return setTimeout(t, 0)
        if ((r === o || !r) && setTimeout) return (r = setTimeout), setTimeout(t, 0)
        try {
          return r(t, 0)
        } catch (e) {
          try {
            return r.call(null, t, 0)
          } catch (e) {
            return r.call(this, t, 0)
          }
        }
      }
      !(function () {
        try {
          r = 'function' == typeof setTimeout ? setTimeout : o
        } catch (t) {
          r = o
        }
        try {
          n = 'function' == typeof clearTimeout ? clearTimeout : s
        } catch (t) {
          n = s
        }
      })()
      var a,
        f = [],
        h = !1,
        l = -1
      function c() {
        h && a && ((h = !1), a.length ? (f = a.concat(f)) : (l = -1), f.length && p())
      }
      function p() {
        if (!h) {
          var t = u(c)
          h = !0
          for (var e = f.length; e; ) {
            for (a = f, f = []; ++l < e; ) a && a[l].run()
            ;(l = -1), (e = f.length)
          }
          ;(a = null),
            (h = !1),
            (function (t) {
              if (n === clearTimeout) return clearTimeout(t)
              if ((n === s || !n) && clearTimeout) return (n = clearTimeout), clearTimeout(t)
              try {
                n(t)
              } catch (e) {
                try {
                  return n.call(null, t)
                } catch (e) {
                  return n.call(this, t)
                }
              }
            })(t)
        }
      }
      function g(t, e) {
        ;(this.fun = t), (this.array = e)
      }
      function d() {}
      ;(i.nextTick = function (t) {
        var e = new Array(arguments.length - 1)
        if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r]
        f.push(new g(t, e)), 1 !== f.length || h || u(p)
      }),
        (g.prototype.run = function () {
          this.fun.apply(null, this.array)
        }),
        (i.title = 'browser'),
        (i.browser = !0),
        (i.env = {}),
        (i.argv = []),
        (i.version = ''),
        (i.versions = {}),
        (i.on = d),
        (i.addListener = d),
        (i.once = d),
        (i.off = d),
        (i.removeListener = d),
        (i.removeAllListeners = d),
        (i.emit = d),
        (i.prependListener = d),
        (i.prependOnceListener = d),
        (i.listeners = function (t) {
          return []
        }),
        (i.binding = function (t) {
          throw new Error('process.binding is not supported')
        }),
        (i.cwd = function () {
          return '/'
        }),
        (i.chdir = function (t) {
          throw new Error('process.chdir is not supported')
        }),
        (i.umask = function () {
          return 0
        })
    },
  ])
})
//-------------------------------------------------------------

const unpackBridge = WorkerScope.unpackBridge

let unpack

//-------------------------unpack--------------------------
var initunpack = function (buffer) {
  // The following code has been _carefully_ modified by hand.
  // Due to WebPack embedding this script into the Zea engine
  // build, certain features broke.
  // There was code to handle loading in a nodeJS context, that tried to import("fs")
  // WebPack kepts tripping up on that code in its static analysis of the code, so
  // I carefully removed it.
  // The global scope of the script seems to be different, so unpackBridge was not available.
  // The unpackBridge code assigns unpackBridge to the passed in scope, which is 'this', but that
  // scope isn't available inside this 'unpack' function.
  const unpack = Module

  // Note: the following is the URL of the unpack.wasm file in our ZeaEngine project on our
  // server. Ideally we could use a relative path from the ZeaEngine file, but
  // that isn't possible yet. (TODO: Ask Mauro about this)
  const credentials = 'omit'

  var Ext = unpackBridge.Ext
  var jsAPI = {
    open: function () {
      return Ext.current.open.apply(Ext.current, arguments)
    },
    close: function () {
      return Ext.current.close.apply(Ext.current, arguments)
    },
    read: function () {
      return Ext.current.read.apply(Ext.current, arguments)
    },
    write: function () {
      return Ext.current.write.apply(Ext.current, arguments)
    },
    tell: function () {
      return Ext.current.tell.apply(Ext.current, arguments)
    },
    seek: function () {
      return Ext.current.seek.apply(Ext.current, arguments)
    },
    create: function () {
      return Ext.current.create.apply(Ext.current, arguments)
    },
  }
  var moduleOverrides = {}
  var key
  for (key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key]
    }
  }
  Module['wasmBinary'] = buffer
  Module['arguments'] = []
  Module['thisProgram'] = './this.program'
  Module['quit'] = function (status, toThrow) {
    throw toThrow
  }
  Module['preRun'] = []
  Module['postRun'] = []
  var ENVIRONMENT_IS_WEB = false
  var ENVIRONMENT_IS_WORKER = false
  var ENVIRONMENT_IS_NODE = false
  var ENVIRONMENT_IS_SHELL = false
  if (Module['ENVIRONMENT']) {
    if (Module['ENVIRONMENT'] === 'WEB') {
      ENVIRONMENT_IS_WEB = true
    } else if (Module['ENVIRONMENT'] === 'WORKER') {
      ENVIRONMENT_IS_WORKER = true
    } else if (Module['ENVIRONMENT'] === 'NODE') {
      ENVIRONMENT_IS_NODE = true
    } else if (Module['ENVIRONMENT'] === 'SHELL') {
      ENVIRONMENT_IS_SHELL = true
    } else {
      throw new Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.")
    }
  } else {
    ENVIRONMENT_IS_WEB = typeof window === 'object'
    ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'
    ENVIRONMENT_IS_NODE =
      typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER
    ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER
  }
  if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    Module['read'] = function shell_read(url) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, false)
      xhr.send(null)
      return xhr.responseText
    }
    if (ENVIRONMENT_IS_WORKER) {
      Module['readBinary'] = function readBinary(url) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.responseType = 'arraybuffer'
        xhr.send(null)
        return new Uint8Array(xhr.response)
      }
    }
    Module['readAsync'] = function readAsync(url, onload, onerror) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
          onload(xhr.response)
          return
        }
        onerror()
      }
      xhr.onerror = onerror
      xhr.send(null)
    }
    Module['setWindowTitle'] = function (title) {
      document.title = title
    }
  }
  Module['print'] =
    typeof console !== 'undefined' ? console.log.bind(console) : typeof print !== 'undefined' ? print : null
  Module['printErr'] =
    typeof printErr !== 'undefined'
      ? printErr
      : (typeof console !== 'undefined' && console.warn.bind(console)) || Module['print']
  Module.print = Module['print']
  Module.printErr = Module['printErr']
  for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key]
    }
  }
  moduleOverrides = undefined
  var STACK_ALIGN = 16
  function staticAlloc(size) {
    assert(!staticSealed)
    var ret = STATICTOP
    STATICTOP = (STATICTOP + size + 15) & -16
    return ret
  }
  function dynamicAlloc(size) {
    assert(DYNAMICTOP_PTR)
    var ret = HEAP32[DYNAMICTOP_PTR >> 2]
    var end = (ret + size + 15) & -16
    HEAP32[DYNAMICTOP_PTR >> 2] = end
    if (end >= TOTAL_MEMORY) {
      var success = enlargeMemory()
      if (!success) {
        HEAP32[DYNAMICTOP_PTR >> 2] = ret
        return 0
      }
    }
    return ret
  }
  function alignMemory(size, factor) {
    if (!factor) factor = STACK_ALIGN
    var ret = (size = Math.ceil(size / factor) * factor)
    return ret
  }
  function getNativeTypeSize(type) {
    switch (type) {
      case 'i1':
      case 'i8':
        return 1
      case 'i16':
        return 2
      case 'i32':
        return 4
      case 'i64':
        return 8
      case 'float':
        return 4
      case 'double':
        return 8
      default: {
        if (type[type.length - 1] === '*') {
          return 4
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1))
          assert(bits % 8 === 0)
          return bits / 8
        } else {
          return 0
        }
      }
    }
  }
  var functionPointers = new Array(0)
  var GLOBAL_BASE = 1024
  var ABORT = 0
  var EXITSTATUS = 0
  function assert(condition, text) {
    if (!condition) {
      abort('Assertion failed: ' + text)
    }
  }
  function setValue(ptr, value, type, noSafe) {
    type = type || 'i8'
    if (type.charAt(type.length - 1) === '*') type = 'i32'
    switch (type) {
      case 'i1':
        HEAP8[ptr >> 0] = value
        break
      case 'i8':
        HEAP8[ptr >> 0] = value
        break
      case 'i16':
        HEAP16[ptr >> 1] = value
        break
      case 'i32':
        HEAP32[ptr >> 2] = value
        break
      case 'i64':
        ;(tempI64 = [
          value >>> 0,
          ((tempDouble = value),
          +Math_abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0),
        ]),
          (HEAP32[ptr >> 2] = tempI64[0]),
          (HEAP32[(ptr + 4) >> 2] = tempI64[1])
        break
      case 'float':
        HEAPF32[ptr >> 2] = value
        break
      case 'double':
        HEAPF64[ptr >> 3] = value
        break
      default:
        abort('invalid type for setValue: ' + type)
    }
  }
  var ALLOC_NORMAL = 0
  var ALLOC_STATIC = 2
  var ALLOC_NONE = 4
  function allocate(slab, types, allocator, ptr) {
    var zeroinit, size
    if (typeof slab === 'number') {
      zeroinit = true
      size = slab
    } else {
      zeroinit = false
      size = slab.length
    }
    var singleType = typeof types === 'string' ? types : null
    var ret
    if (allocator == ALLOC_NONE) {
      ret = ptr
    } else {
      ret = [typeof _malloc === 'function' ? _malloc : staticAlloc, stackAlloc, staticAlloc, dynamicAlloc][
        allocator === undefined ? ALLOC_STATIC : allocator
      ](Math.max(size, singleType ? 1 : types.length))
    }
    if (zeroinit) {
      var stop
      ptr = ret
      assert((ret & 3) == 0)
      stop = ret + (size & ~3)
      for (; ptr < stop; ptr += 4) {
        HEAP32[ptr >> 2] = 0
      }
      stop = ret + size
      while (ptr < stop) {
        HEAP8[ptr++ >> 0] = 0
      }
      return ret
    }
    if (singleType === 'i8') {
      if (slab.subarray || slab.slice) {
        HEAPU8.set(slab, ret)
      } else {
        HEAPU8.set(new Uint8Array(slab), ret)
      }
      return ret
    }
    var i = 0,
      type,
      typeSize,
      previousType
    while (i < size) {
      var curr = slab[i]
      type = singleType || types[i]
      if (type === 0) {
        i++
        continue
      }
      if (type == 'i64') type = 'i32'
      setValue(ret + i, curr, type)
      if (previousType !== type) {
        typeSize = getNativeTypeSize(type)
        previousType = type
      }
      i += typeSize
    }
    return ret
  }
  function Pointer_stringify(ptr, length) {
    if (length === 0 || !ptr) return ''
    var hasUtf = 0
    var t
    var i = 0
    while (1) {
      t = HEAPU8[(ptr + i) >> 0]
      hasUtf |= t
      if (t == 0 && !length) break
      i++
      if (length && i == length) break
    }
    if (!length) length = i
    var ret = ''
    if (hasUtf < 128) {
      var MAX_CHUNK = 1024
      var curr
      while (length > 0) {
        curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)))
        ret = ret ? ret + curr : curr
        ptr += MAX_CHUNK
        length -= MAX_CHUNK
      }
      return ret
    }
    return UTF8ToString(ptr)
  }
  var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined
  function UTF8ArrayToString(u8Array, idx) {
    var endPtr = idx
    while (u8Array[endPtr]) ++endPtr
    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(u8Array.subarray(idx, endPtr))
    } else {
      var u0, u1, u2, u3, u4, u5
      var str = ''
      while (1) {
        u0 = u8Array[idx++]
        if (!u0) return str
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0)
          continue
        }
        u1 = u8Array[idx++] & 63
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1)
          continue
        }
        u2 = u8Array[idx++] & 63
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
        } else {
          u3 = u8Array[idx++] & 63
          if ((u0 & 248) == 240) {
            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3
          } else {
            u4 = u8Array[idx++] & 63
            if ((u0 & 252) == 248) {
              u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4
            } else {
              u5 = u8Array[idx++] & 63
              u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5
            }
          }
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0)
        } else {
          var ch = u0 - 65536
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
        }
      }
    }
  }
  function UTF8ToString(ptr) {
    return UTF8ArrayToString(HEAPU8, ptr)
  }
  function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0
    var startIdx = outIdx
    var endIdx = outIdx + maxBytesToWrite - 1
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i)
      if (u >= 55296 && u <= 57343) u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023)
      if (u <= 127) {
        if (outIdx >= endIdx) break
        outU8Array[outIdx++] = u
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break
        outU8Array[outIdx++] = 192 | (u >> 6)
        outU8Array[outIdx++] = 128 | (u & 63)
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break
        outU8Array[outIdx++] = 224 | (u >> 12)
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63)
        outU8Array[outIdx++] = 128 | (u & 63)
      } else if (u <= 2097151) {
        if (outIdx + 3 >= endIdx) break
        outU8Array[outIdx++] = 240 | (u >> 18)
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63)
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63)
        outU8Array[outIdx++] = 128 | (u & 63)
      } else if (u <= 67108863) {
        if (outIdx + 4 >= endIdx) break
        outU8Array[outIdx++] = 248 | (u >> 24)
        outU8Array[outIdx++] = 128 | ((u >> 18) & 63)
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63)
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63)
        outU8Array[outIdx++] = 128 | (u & 63)
      } else {
        if (outIdx + 5 >= endIdx) break
        outU8Array[outIdx++] = 252 | (u >> 30)
        outU8Array[outIdx++] = 128 | ((u >> 24) & 63)
        outU8Array[outIdx++] = 128 | ((u >> 18) & 63)
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63)
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63)
        outU8Array[outIdx++] = 128 | (u & 63)
      }
    }
    outU8Array[outIdx] = 0
    return outIdx - startIdx
  }
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
  }
  function lengthBytesUTF8(str) {
    var len = 0
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i)
      if (u >= 55296 && u <= 57343) u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023)
      if (u <= 127) {
        ++len
      } else if (u <= 2047) {
        len += 2
      } else if (u <= 65535) {
        len += 3
      } else if (u <= 2097151) {
        len += 4
      } else if (u <= 67108863) {
        len += 5
      } else {
        len += 6
      }
    }
    return len
  }
  var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined
  function UTF32ToString(ptr) {
    var i = 0
    var str = ''
    while (1) {
      var utf32 = HEAP32[(ptr + i * 4) >> 2]
      if (utf32 == 0) return str
      ++i
      if (utf32 >= 65536) {
        var ch = utf32 - 65536
        str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
      } else {
        str += String.fromCharCode(utf32)
      }
    }
  }
  function allocateUTF8(str) {
    var size = lengthBytesUTF8(str) + 1
    var ret = _malloc(size)
    if (ret) stringToUTF8Array(str, HEAP8, ret, size)
    return ret
  }
  function demangle(func) {
    return func
  }
  function demangleAll(text) {
    var regex = /__Z[\w\d_]+/g
    return text.replace(regex, function (x) {
      var y = demangle(x)
      return x === y ? x : x + ' [' + y + ']'
    })
  }
  function jsStackTrace() {
    var err = new Error()
    if (!err.stack) {
      try {
        throw new Error(0)
      } catch (e) {
        err = e
      }
      if (!err.stack) {
        return '(no stack trace available)'
      }
    }
    return err.stack.toString()
  }
  function stackTrace() {
    var js = jsStackTrace()
    if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']()
    return demangleAll(js)
  }
  var WASM_PAGE_SIZE = 65536
  var ASMJS_PAGE_SIZE = 16777216
  var MIN_TOTAL_MEMORY = 16777216
  function alignUp(x, multiple) {
    if (x % multiple > 0) {
      x += multiple - (x % multiple)
    }
    return x
  }
  var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
  function updateGlobalBuffer(buf) {
    Module['buffer'] = buffer = buf
  }
  function updateGlobalBufferViews() {
    Module['HEAP8'] = HEAP8 = new Int8Array(buffer)
    Module['HEAP16'] = HEAP16 = new Int16Array(buffer)
    Module['HEAP32'] = HEAP32 = new Int32Array(buffer)
    Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer)
    Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer)
    Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer)
    Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer)
    Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer)
  }
  var STATIC_BASE, STATICTOP, staticSealed
  var STACK_BASE, STACKTOP, STACK_MAX
  var DYNAMIC_BASE, DYNAMICTOP_PTR
  STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0
  staticSealed = false
  function abortOnCannotGrowMemory() {
    abort(
      'Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' +
        TOTAL_MEMORY +
        ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 '
    )
  }
  if (!Module['reallocBuffer'])
    Module['reallocBuffer'] = function (size) {
      var ret
      try {
        if (ArrayBuffer.transfer) {
          ret = ArrayBuffer.transfer(buffer, size)
        } else {
          var oldHEAP8 = HEAP8
          ret = new ArrayBuffer(size)
          var temp = new Int8Array(ret)
          temp.set(oldHEAP8)
        }
      } catch (e) {
        return false
      }
      var success = _emscripten_replace_memory(ret)
      if (!success) return false
      return ret
    }
  function enlargeMemory() {
    var PAGE_MULTIPLE = Module['usingWasm'] ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE
    var LIMIT = 2147483648 - PAGE_MULTIPLE
    if (HEAP32[DYNAMICTOP_PTR >> 2] > LIMIT) {
      return false
    }
    var OLD_TOTAL_MEMORY = TOTAL_MEMORY
    TOTAL_MEMORY = Math.max(TOTAL_MEMORY, MIN_TOTAL_MEMORY)
    while (TOTAL_MEMORY < HEAP32[DYNAMICTOP_PTR >> 2]) {
      if (TOTAL_MEMORY <= 536870912) {
        TOTAL_MEMORY = alignUp(2 * TOTAL_MEMORY, PAGE_MULTIPLE)
      } else {
        TOTAL_MEMORY = Math.min(alignUp((3 * TOTAL_MEMORY + 2147483648) / 4, PAGE_MULTIPLE), LIMIT)
      }
    }
    var replacement = Module['reallocBuffer'](TOTAL_MEMORY)
    if (!replacement || replacement.byteLength != TOTAL_MEMORY) {
      TOTAL_MEMORY = OLD_TOTAL_MEMORY
      return false
    }
    updateGlobalBuffer(replacement)
    updateGlobalBufferViews()
    return true
  }
  var byteLength
  try {
    byteLength = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get)
    byteLength(new ArrayBuffer(4))
  } catch (e) {
    byteLength = function (buffer) {
      return buffer.byteLength
    }
  }
  var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880
  var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216
  if (TOTAL_MEMORY < TOTAL_STACK)
    Module.printErr(
      'TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')'
    )
  if (Module['buffer']) {
    buffer = Module['buffer']
  } else {
    if (typeof WebAssembly === 'object' && typeof WebAssembly.Memory === 'function') {
      Module['wasmMemory'] = new WebAssembly.Memory({ initial: TOTAL_MEMORY / WASM_PAGE_SIZE })
      buffer = Module['wasmMemory'].buffer
    } else {
      buffer = new ArrayBuffer(TOTAL_MEMORY)
    }
    Module['buffer'] = buffer
  }
  updateGlobalBufferViews()
  function getTotalMemory() {
    return TOTAL_MEMORY
  }
  HEAP32[0] = 1668509029
  HEAP16[1] = 25459
  if (HEAPU8[2] !== 115 || HEAPU8[3] !== 99) throw 'Runtime error: expected the system to be little-endian!'
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift()
      if (typeof callback == 'function') {
        callback()
        continue
      }
      var func = callback.func
      if (typeof func === 'number') {
        if (callback.arg === undefined) {
          Module['dynCall_v'](func)
        } else {
          Module['dynCall_vi'](func, callback.arg)
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg)
      }
    }
  }
  var __ATPRERUN__ = []
  var __ATINIT__ = []
  var __ATMAIN__ = []
  var __ATEXIT__ = []
  var __ATPOSTRUN__ = []
  var runtimeInitialized = false
  var runtimeExited = false
  function preRun() {
    if (Module['preRun']) {
      if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']]
      while (Module['preRun'].length) {
        addOnPreRun(Module['preRun'].shift())
      }
    }
    callRuntimeCallbacks(__ATPRERUN__)
  }
  function ensureInitRuntime() {
    if (runtimeInitialized) return
    runtimeInitialized = true
    callRuntimeCallbacks(__ATINIT__)
  }
  function preMain() {
    callRuntimeCallbacks(__ATMAIN__)
  }
  function exitRuntime() {
    callRuntimeCallbacks(__ATEXIT__)
    runtimeExited = true
  }
  function postRun() {
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']]
      while (Module['postRun'].length) {
        addOnPostRun(Module['postRun'].shift())
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__)
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb)
  }
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb)
  }
  function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
      HEAP8[buffer++ >> 0] = str.charCodeAt(i)
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0
  }
  var Math_abs = Math.abs
  var Math_cos = Math.cos
  var Math_sin = Math.sin
  var Math_tan = Math.tan
  var Math_acos = Math.acos
  var Math_asin = Math.asin
  var Math_atan = Math.atan
  var Math_atan2 = Math.atan2
  var Math_exp = Math.exp
  var Math_log = Math.log
  var Math_sqrt = Math.sqrt
  var Math_ceil = Math.ceil
  var Math_floor = Math.floor
  var Math_pow = Math.pow
  var Math_imul = Math.imul
  var Math_fround = Math.fround
  var Math_round = Math.round
  var Math_min = Math.min
  var Math_max = Math.max
  var Math_clz32 = Math.clz32
  var Math_trunc = Math.trunc
  var runDependencies = 0
  var runDependencyWatcher = null
  var dependenciesFulfilled = null
  function getUniqueRunDependency(id) {
    return id
  }
  function addRunDependency(id) {
    runDependencies++
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies)
    }
  }
  function removeRunDependency(id) {
    runDependencies--
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies)
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher)
        runDependencyWatcher = null
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled
        dependenciesFulfilled = null
        callback()
      }
    }
  }
  Module['preloadedImages'] = {}
  Module['preloadedAudios'] = {}
  var dataURIPrefix = 'data:application/octet-stream;base64,'
  function isDataURI(filename) {
    return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0
  }
  function integrateWasmJS() {
    var wasmTextFile = 'unpack.wast'
    var asmjsCodeFile = 'unpack.temp.asm.js'
    if (typeof Module['locateFile'] === 'function') {
      if (!isDataURI(wasmTextFile)) {
        wasmTextFile = Module['locateFile'](wasmTextFile)
      }
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = Module['locateFile'](wasmBinaryFile)
      }
      if (!isDataURI(asmjsCodeFile)) {
        asmjsCodeFile = Module['locateFile'](asmjsCodeFile)
      }
    }
    var wasmPageSize = 64 * 1024
    var info = {
      global: null,
      env: null,
      asm2wasm: {
        'f64-rem': function (x, y) {
          return x % y
        },
        debugger: function () {
          debugger
        },
      },
      parent: Module,
    }
    var exports = null
    function mergeMemory(newBuffer) {
      var oldBuffer = Module['buffer']
      if (newBuffer.byteLength < oldBuffer.byteLength) {
        Module['printErr'](
          'the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here'
        )
      }
      var oldView = new Int8Array(oldBuffer)
      var newView = new Int8Array(newBuffer)
      newView.set(oldView)
      updateGlobalBuffer(newBuffer)
      updateGlobalBufferViews()
    }
    function fixImports(imports) {
      return imports
    }
    function getBinary() {
      try {
        if (Module['wasmBinary']) {
          return new Uint8Array(Module['wasmBinary'])
        }
        if (Module['readBinary']) {
          return Module['readBinary'](wasmBinaryFile)
        } else {
          throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)"
        }
      } catch (err) {
        abort(err)
      }
    }
    function getBinaryPromise() {
      if (!Module['wasmBinary'] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
        return fetch(wasmBinaryFile, { credentials })
          .then(function (response) {
            if (!response['ok']) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
            }
            return response['arrayBuffer']()
          })
          .catch(function () {
            return getBinary()
          })
      }
      return new Promise(function (resolve, reject) {
        resolve(getBinary())
      })
    }
    function doNativeWasm(global, env, providedBuffer) {
      if (typeof WebAssembly !== 'object') {
        Module['printErr']('no native wasm support detected')
        return false
      }
      if (!(Module['wasmMemory'] instanceof WebAssembly.Memory)) {
        Module['printErr']('no native wasm Memory in use')
        return false
      }
      env['memory'] = Module['wasmMemory']
      info['global'] = { NaN: NaN, Infinity: Infinity }
      info['global.Math'] = Math
      info['env'] = env
      function receiveInstance(instance, module) {
        exports = instance.exports
        if (exports.memory) mergeMemory(exports.memory)
        Module['asm'] = exports
        Module['usingWasm'] = true
        removeRunDependency('wasm-instantiate')
      }
      addRunDependency('wasm-instantiate')
      if (Module['instantiateWasm']) {
        try {
          return Module['instantiateWasm'](info, receiveInstance)
        } catch (e) {
          Module['printErr']('Module.instantiateWasm callback failed with error: ' + e)
          return false
        }
      }
      function receiveInstantiatedSource(output) {
        receiveInstance(output['instance'], output['module'])
      }
      function instantiateArrayBuffer(receiver) {
        getBinaryPromise()
          .then(function (binary) {
            return WebAssembly.instantiate(binary, info)
          })
          .then(receiver)
          .catch(function (reason) {
            Module['printErr']('failed to asynchronously prepare wasm: ' + reason)
            abort(reason)
          })
      }
      if (
        !Module['wasmBinary'] &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        typeof fetch === 'function'
      ) {
        WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, { credentials }), info)
          .then(receiveInstantiatedSource)
          .catch(function (reason) {
            Module['printErr']('wasm streaming compile failed: ' + reason)
            Module['printErr']('falling back to ArrayBuffer instantiation')
            instantiateArrayBuffer(receiveInstantiatedSource)
          })
      } else {
        instantiateArrayBuffer(receiveInstantiatedSource)
      }
      return {}
    }
    Module['asmPreload'] = Module['asm']
    var asmjsReallocBuffer = Module['reallocBuffer']
    var wasmReallocBuffer = function (size) {
      var PAGE_MULTIPLE = Module['usingWasm'] ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE
      size = alignUp(size, PAGE_MULTIPLE)
      var old = Module['buffer']
      var oldSize = old.byteLength
      if (Module['usingWasm']) {
        try {
          var result = Module['wasmMemory'].grow((size - oldSize) / wasmPageSize)
          if (result !== (-1 | 0)) {
            return (Module['buffer'] = Module['wasmMemory'].buffer)
          } else {
            return null
          }
        } catch (e) {
          return null
        }
      }
    }
    Module['reallocBuffer'] = function (size) {
      if (finalMethod === 'asmjs') {
        return asmjsReallocBuffer(size)
      } else {
        return wasmReallocBuffer(size)
      }
    }
    var finalMethod = ''
    Module['asm'] = function (global, env, providedBuffer) {
      env = fixImports(env)
      if (!env['table']) {
        var TABLE_SIZE = Module['wasmTableSize']
        if (TABLE_SIZE === undefined) TABLE_SIZE = 1024
        var MAX_TABLE_SIZE = Module['wasmMaxTableSize']
        if (typeof WebAssembly === 'object' && typeof WebAssembly.Table === 'function') {
          if (MAX_TABLE_SIZE !== undefined) {
            env['table'] = new WebAssembly.Table({ initial: TABLE_SIZE, maximum: MAX_TABLE_SIZE, element: 'anyfunc' })
          } else {
            env['table'] = new WebAssembly.Table({ initial: TABLE_SIZE, element: 'anyfunc' })
          }
        } else {
          env['table'] = new Array(TABLE_SIZE)
        }
        Module['wasmTable'] = env['table']
      }
      if (!env['memoryBase']) {
        env['memoryBase'] = Module['STATIC_BASE']
      }
      if (!env['tableBase']) {
        env['tableBase'] = 0
      }
      var exports
      exports = doNativeWasm(global, env, providedBuffer)
      if (!exports)
        abort(
          'no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods'
        )
      return exports
    }
  }
  integrateWasmJS()
  STATIC_BASE = GLOBAL_BASE
  STATICTOP = STATIC_BASE + 66960
  __ATINIT__.push(
    {
      func: function () {
        __GLOBAL__sub_I_global_cpp()
      },
    },
    {
      func: function () {
        __GLOBAL__sub_I_crc_cpp()
      },
    },
    {
      func: function () {
        __GLOBAL__sub_I_bridge_cpp()
      },
    },
    {
      func: function () {
        __GLOBAL__sub_I_bind_cpp()
      },
    }
  )
  var STATIC_BUMP = 66960
  Module['STATIC_BASE'] = STATIC_BASE
  Module['STATIC_BUMP'] = STATIC_BUMP
  STATICTOP += 16
  function ___cxa_allocate_exception(size) {
    return _malloc(size)
  }
  function __ZSt18uncaught_exceptionv() {
    return !!__ZSt18uncaught_exceptionv.uncaught_exception
  }
  var EXCEPTIONS = {
    last: 0,
    caught: [],
    infos: {},
    deAdjust: function (adjusted) {
      if (!adjusted || EXCEPTIONS.infos[adjusted]) return adjusted
      for (var key in EXCEPTIONS.infos) {
        var ptr = +key
        var info = EXCEPTIONS.infos[ptr]
        if (info.adjusted === adjusted) {
          return ptr
        }
      }
      return adjusted
    },
    addRef: function (ptr) {
      if (!ptr) return
      var info = EXCEPTIONS.infos[ptr]
      info.refcount++
    },
    decRef: function (ptr) {
      if (!ptr) return
      var info = EXCEPTIONS.infos[ptr]
      assert(info.refcount > 0)
      info.refcount--
      if (info.refcount === 0 && !info.rethrown) {
        if (info.destructor) {
          Module['dynCall_vi'](info.destructor, ptr)
        }
        delete EXCEPTIONS.infos[ptr]
        ___cxa_free_exception(ptr)
      }
    },
    clearRef: function (ptr) {
      if (!ptr) return
      var info = EXCEPTIONS.infos[ptr]
      info.refcount = 0
    },
  }
  function ___cxa_begin_catch(ptr) {
    var info = EXCEPTIONS.infos[ptr]
    if (info && !info.caught) {
      info.caught = true
      __ZSt18uncaught_exceptionv.uncaught_exception--
    }
    if (info) info.rethrown = false
    EXCEPTIONS.caught.push(ptr)
    EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr))
    return ptr
  }
  function ___cxa_free_exception(ptr) {
    try {
      return _free(ptr)
    } catch (e) {}
  }
  function ___cxa_end_catch() {
    Module['setThrew'](0)
    var ptr = EXCEPTIONS.caught.pop()
    if (ptr) {
      EXCEPTIONS.decRef(EXCEPTIONS.deAdjust(ptr))
      EXCEPTIONS.last = 0
    }
  }
  function ___cxa_find_matching_catch_2() {
    return ___cxa_find_matching_catch.apply(null, arguments)
  }
  function ___cxa_find_matching_catch_3() {
    return ___cxa_find_matching_catch.apply(null, arguments)
  }
  function ___cxa_find_matching_catch_4() {
    return ___cxa_find_matching_catch.apply(null, arguments)
  }
  function ___resumeException(ptr) {
    if (!EXCEPTIONS.last) {
      EXCEPTIONS.last = ptr
    }
    throw ptr
  }
  function ___cxa_find_matching_catch() {
    var thrown = EXCEPTIONS.last
    if (!thrown) {
      return (setTempRet0(0), 0) | 0
    }
    var info = EXCEPTIONS.infos[thrown]
    var throwntype = info.type
    if (!throwntype) {
      return (setTempRet0(0), thrown) | 0
    }
    var typeArray = Array.prototype.slice.call(arguments)
    var pointer = Module['___cxa_is_pointer_type'](throwntype)
    if (!___cxa_find_matching_catch.buffer) ___cxa_find_matching_catch.buffer = _malloc(4)
    HEAP32[___cxa_find_matching_catch.buffer >> 2] = thrown
    thrown = ___cxa_find_matching_catch.buffer
    for (var i = 0; i < typeArray.length; i++) {
      if (typeArray[i] && Module['___cxa_can_catch'](typeArray[i], throwntype, thrown)) {
        thrown = HEAP32[thrown >> 2]
        info.adjusted = thrown
        return (setTempRet0(typeArray[i]), thrown) | 0
      }
    }
    thrown = HEAP32[thrown >> 2]
    return (setTempRet0(throwntype), thrown) | 0
  }
  function ___cxa_throw(ptr, type, destructor) {
    EXCEPTIONS.infos[ptr] = {
      ptr: ptr,
      adjusted: ptr,
      type: type,
      destructor: destructor,
      refcount: 0,
      caught: false,
      rethrown: false,
    }
    EXCEPTIONS.last = ptr
    if (!('uncaught_exception' in __ZSt18uncaught_exceptionv)) {
      __ZSt18uncaught_exceptionv.uncaught_exception = 1
    } else {
      __ZSt18uncaught_exceptionv.uncaught_exception++
    }
    throw ptr
  }
  function ___lock() {}
  var ERRNO_CODES = {
    EPERM: 1,
    ENOENT: 2,
    ESRCH: 3,
    EINTR: 4,
    EIO: 5,
    ENXIO: 6,
    E2BIG: 7,
    ENOEXEC: 8,
    EBADF: 9,
    ECHILD: 10,
    EAGAIN: 11,
    EWOULDBLOCK: 11,
    ENOMEM: 12,
    EACCES: 13,
    EFAULT: 14,
    ENOTBLK: 15,
    EBUSY: 16,
    EEXIST: 17,
    EXDEV: 18,
    ENODEV: 19,
    ENOTDIR: 20,
    EISDIR: 21,
    EINVAL: 22,
    ENFILE: 23,
    EMFILE: 24,
    ENOTTY: 25,
    ETXTBSY: 26,
    EFBIG: 27,
    ENOSPC: 28,
    ESPIPE: 29,
    EROFS: 30,
    EMLINK: 31,
    EPIPE: 32,
    EDOM: 33,
    ERANGE: 34,
    ENOMSG: 42,
    EIDRM: 43,
    ECHRNG: 44,
    EL2NSYNC: 45,
    EL3HLT: 46,
    EL3RST: 47,
    ELNRNG: 48,
    EUNATCH: 49,
    ENOCSI: 50,
    EL2HLT: 51,
    EDEADLK: 35,
    ENOLCK: 37,
    EBADE: 52,
    EBADR: 53,
    EXFULL: 54,
    ENOANO: 55,
    EBADRQC: 56,
    EBADSLT: 57,
    EDEADLOCK: 35,
    EBFONT: 59,
    ENOSTR: 60,
    ENODATA: 61,
    ETIME: 62,
    ENOSR: 63,
    ENONET: 64,
    ENOPKG: 65,
    EREMOTE: 66,
    ENOLINK: 67,
    EADV: 68,
    ESRMNT: 69,
    ECOMM: 70,
    EPROTO: 71,
    EMULTIHOP: 72,
    EDOTDOT: 73,
    EBADMSG: 74,
    ENOTUNIQ: 76,
    EBADFD: 77,
    EREMCHG: 78,
    ELIBACC: 79,
    ELIBBAD: 80,
    ELIBSCN: 81,
    ELIBMAX: 82,
    ELIBEXEC: 83,
    ENOSYS: 38,
    ENOTEMPTY: 39,
    ENAMETOOLONG: 36,
    ELOOP: 40,
    EOPNOTSUPP: 95,
    EPFNOSUPPORT: 96,
    ECONNRESET: 104,
    ENOBUFS: 105,
    EAFNOSUPPORT: 97,
    EPROTOTYPE: 91,
    ENOTSOCK: 88,
    ENOPROTOOPT: 92,
    ESHUTDOWN: 108,
    ECONNREFUSED: 111,
    EADDRINUSE: 98,
    ECONNABORTED: 103,
    ENETUNREACH: 101,
    ENETDOWN: 100,
    ETIMEDOUT: 110,
    EHOSTDOWN: 112,
    EHOSTUNREACH: 113,
    EINPROGRESS: 115,
    EALREADY: 114,
    EDESTADDRREQ: 89,
    EMSGSIZE: 90,
    EPROTONOSUPPORT: 93,
    ESOCKTNOSUPPORT: 94,
    EADDRNOTAVAIL: 99,
    ENETRESET: 102,
    EISCONN: 106,
    ENOTCONN: 107,
    ETOOMANYREFS: 109,
    EUSERS: 87,
    EDQUOT: 122,
    ESTALE: 116,
    ENOTSUP: 95,
    ENOMEDIUM: 123,
    EILSEQ: 84,
    EOVERFLOW: 75,
    ECANCELED: 125,
    ENOTRECOVERABLE: 131,
    EOWNERDEAD: 130,
    ESTRPIPE: 86,
  }
  function ___setErrNo(value) {
    if (Module['___errno_location']) HEAP32[Module['___errno_location']() >> 2] = value
    return value
  }
  function ___map_file(pathname, size) {
    ___setErrNo(ERRNO_CODES.EPERM)
    return -1
  }
  var ERRNO_MESSAGES = {
    0: 'Success',
    1: 'Not super-user',
    2: 'No such file or directory',
    3: 'No such process',
    4: 'Interrupted system call',
    5: 'I/O error',
    6: 'No such device or address',
    7: 'Arg list too long',
    8: 'Exec format error',
    9: 'Bad file number',
    10: 'No children',
    11: 'No more processes',
    12: 'Not enough core',
    13: 'Permission denied',
    14: 'Bad address',
    15: 'Block device required',
    16: 'Mount device busy',
    17: 'File exists',
    18: 'Cross-device link',
    19: 'No such device',
    20: 'Not a directory',
    21: 'Is a directory',
    22: 'Invalid argument',
    23: 'Too many open files in system',
    24: 'Too many open files',
    25: 'Not a typewriter',
    26: 'Text file busy',
    27: 'File too large',
    28: 'No space left on device',
    29: 'Illegal seek',
    30: 'Read only file system',
    31: 'Too many links',
    32: 'Broken pipe',
    33: 'Math arg out of domain of func',
    34: 'Math result not representable',
    35: 'File locking deadlock error',
    36: 'File or path name too long',
    37: 'No record locks available',
    38: 'Function not implemented',
    39: 'Directory not empty',
    40: 'Too many symbolic links',
    42: 'No message of desired type',
    43: 'Identifier removed',
    44: 'Channel number out of range',
    45: 'Level 2 not synchronized',
    46: 'Level 3 halted',
    47: 'Level 3 reset',
    48: 'Link number out of range',
    49: 'Protocol driver not attached',
    50: 'No CSI structure available',
    51: 'Level 2 halted',
    52: 'Invalid exchange',
    53: 'Invalid request descriptor',
    54: 'Exchange full',
    55: 'No anode',
    56: 'Invalid request code',
    57: 'Invalid slot',
    59: 'Bad font file fmt',
    60: 'Device not a stream',
    61: 'No data (for no delay io)',
    62: 'Timer expired',
    63: 'Out of streams resources',
    64: 'Machine is not on the network',
    65: 'Package not installed',
    66: 'The object is remote',
    67: 'The link has been severed',
    68: 'Advertise error',
    69: 'Srmount error',
    70: 'Communication error on send',
    71: 'Protocol error',
    72: 'Multihop attempted',
    73: 'Cross mount point (not really error)',
    74: 'Trying to read unreadable message',
    75: 'Value too large for defined data type',
    76: 'Given log. name not unique',
    77: 'f.d. invalid for this operation',
    78: 'Remote address changed',
    79: 'Can   access a needed shared lib',
    80: 'Accessing a corrupted shared lib',
    81: '.lib section in a.out corrupted',
    82: 'Attempting to link in too many libs',
    83: 'Attempting to exec a shared library',
    84: 'Illegal byte sequence',
    86: 'Streams pipe error',
    87: 'Too many users',
    88: 'Socket operation on non-socket',
    89: 'Destination address required',
    90: 'Message too long',
    91: 'Protocol wrong type for socket',
    92: 'Protocol not available',
    93: 'Unknown protocol',
    94: 'Socket type not supported',
    95: 'Not supported',
    96: 'Protocol family not supported',
    97: 'Address family not supported by protocol family',
    98: 'Address already in use',
    99: 'Address not available',
    100: 'Network interface is not configured',
    101: 'Network is unreachable',
    102: 'Connection reset by network',
    103: 'Connection aborted',
    104: 'Connection reset by peer',
    105: 'No buffer space available',
    106: 'Socket is already connected',
    107: 'Socket is not connected',
    108: "Can't send after socket shutdown",
    109: 'Too many references',
    110: 'Connection timed out',
    111: 'Connection refused',
    112: 'Host is down',
    113: 'Host is unreachable',
    114: 'Socket already connected',
    115: 'Connection already in progress',
    116: 'Stale file handle',
    122: 'Quota exceeded',
    123: 'No medium (in tape drive)',
    125: 'Operation canceled',
    130: 'Previous owner died',
    131: 'State not recoverable',
  }
  var PATH = {
    splitPath: function (filename) {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
      return splitPathRe.exec(filename).slice(1)
    },
    normalizeArray: function (parts, allowAboveRoot) {
      var up = 0
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i]
        if (last === '.') {
          parts.splice(i, 1)
        } else if (last === '..') {
          parts.splice(i, 1)
          up++
        } else if (up) {
          parts.splice(i, 1)
          up--
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift('..')
        }
      }
      return parts
    },
    normalize: function (path) {
      var isAbsolute = path.charAt(0) === '/',
        trailingSlash = path.substr(-1) === '/'
      path = PATH.normalizeArray(
        path.split('/').filter(function (p) {
          return !!p
        }),
        !isAbsolute
      ).join('/')
      if (!path && !isAbsolute) {
        path = '.'
      }
      if (path && trailingSlash) {
        path += '/'
      }
      return (isAbsolute ? '/' : '') + path
    },
    dirname: function (path) {
      var result = PATH.splitPath(path),
        root = result[0],
        dir = result[1]
      if (!root && !dir) {
        return '.'
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1)
      }
      return root + dir
    },
    basename: function (path) {
      if (path === '/') return '/'
      var lastSlash = path.lastIndexOf('/')
      if (lastSlash === -1) return path
      return path.substr(lastSlash + 1)
    },
    extname: function (path) {
      return PATH.splitPath(path)[3]
    },
    join: function () {
      var paths = Array.prototype.slice.call(arguments, 0)
      return PATH.normalize(paths.join('/'))
    },
    join2: function (l, r) {
      return PATH.normalize(l + '/' + r)
    },
    resolve: function () {
      var resolvedPath = '',
        resolvedAbsolute = false
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : FS.cwd()
        if (typeof path !== 'string') {
          throw new TypeError('Arguments to path.resolve must be strings')
        } else if (!path) {
          return ''
        }
        resolvedPath = path + '/' + resolvedPath
        resolvedAbsolute = path.charAt(0) === '/'
      }
      resolvedPath = PATH.normalizeArray(
        resolvedPath.split('/').filter(function (p) {
          return !!p
        }),
        !resolvedAbsolute
      ).join('/')
      return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
    },
    relative: function (from, to) {
      from = PATH.resolve(from).substr(1)
      to = PATH.resolve(to).substr(1)
      function trim(arr) {
        var start = 0
        for (; start < arr.length; start++) {
          if (arr[start] !== '') break
        }
        var end = arr.length - 1
        for (; end >= 0; end--) {
          if (arr[end] !== '') break
        }
        if (start > end) return []
        return arr.slice(start, end - start + 1)
      }
      var fromParts = trim(from.split('/'))
      var toParts = trim(to.split('/'))
      var length = Math.min(fromParts.length, toParts.length)
      var samePartsLength = length
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i
          break
        }
      }
      var outputParts = []
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..')
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength))
      return outputParts.join('/')
    },
  }
  var TTY = {
    ttys: [],
    init: function () {},
    shutdown: function () {},
    register: function (dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops: ops }
      FS.registerDevice(dev, TTY.stream_ops)
    },
    stream_ops: {
      open: function (stream) {
        var tty = TTY.ttys[stream.node.rdev]
        if (!tty) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
        }
        stream.tty = tty
        stream.seekable = false
      },
      close: function (stream) {
        stream.tty.ops.flush(stream.tty)
      },
      flush: function (stream) {
        stream.tty.ops.flush(stream.tty)
      },
      read: function (stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.get_char) {
          throw new FS.ErrnoError(ERRNO_CODES.ENXIO)
        }
        var bytesRead = 0
        for (var i = 0; i < length; i++) {
          var result
          try {
            result = stream.tty.ops.get_char(stream.tty)
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO)
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
          }
          if (result === null || result === undefined) break
          bytesRead++
          buffer[offset + i] = result
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now()
        }
        return bytesRead
      },
      write: function (stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.put_char) {
          throw new FS.ErrnoError(ERRNO_CODES.ENXIO)
        }
        for (var i = 0; i < length; i++) {
          try {
            stream.tty.ops.put_char(stream.tty, buffer[offset + i])
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO)
          }
        }
        if (length) {
          stream.node.timestamp = Date.now()
        }
        return i
      },
    },
    default_tty_ops: {
      get_char: function (tty) {
        if (!tty.input.length) {
          var result = null
          if (ENVIRONMENT_IS_NODE) {
            var BUFSIZE = 256
            var buf = new Buffer(BUFSIZE)
            var bytesRead = 0
            var isPosixPlatform = process.platform != 'win32'
            var fd = process.stdin.fd
            if (isPosixPlatform) {
              var usingDevice = false
              try {
                fd = fs.openSync('/dev/stdin', 'r')
                usingDevice = true
              } catch (e) {}
            }
            try {
              bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null)
            } catch (e) {
              if (e.toString().indexOf('EOF') != -1) bytesRead = 0
              else throw e
            }
            if (usingDevice) {
              fs.closeSync(fd)
            }
            if (bytesRead > 0) {
              result = buf.slice(0, bytesRead).toString('utf-8')
            } else {
              result = null
            }
          } else if (typeof window != 'undefined' && typeof window.prompt == 'function') {
            result = window.prompt('Input: ')
            if (result !== null) {
              result += '\n'
            }
          } else if (typeof readline == 'function') {
            result = readline()
            if (result !== null) {
              result += '\n'
            }
          }
          if (!result) {
            return null
          }
          tty.input = intArrayFromString(result, true)
        }
        return tty.input.shift()
      },
      put_char: function (tty, val) {
        if (val === null || val === 10) {
          Module['print'](UTF8ArrayToString(tty.output, 0))
          tty.output = []
        } else {
          if (val != 0) tty.output.push(val)
        }
      },
      flush: function (tty) {
        if (tty.output && tty.output.length > 0) {
          Module['print'](UTF8ArrayToString(tty.output, 0))
          tty.output = []
        }
      },
    },
    default_tty1_ops: {
      put_char: function (tty, val) {
        if (val === null || val === 10) {
          Module['printErr'](UTF8ArrayToString(tty.output, 0))
          tty.output = []
        } else {
          if (val != 0) tty.output.push(val)
        }
      },
      flush: function (tty) {
        if (tty.output && tty.output.length > 0) {
          Module['printErr'](UTF8ArrayToString(tty.output, 0))
          tty.output = []
        }
      },
    },
  }
  var MEMFS = {
    ops_table: null,
    mount: function (mount) {
      return MEMFS.createNode(null, '/', 16384 | 511, 0)
    },
    createNode: function (parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      if (!MEMFS.ops_table) {
        MEMFS.ops_table = {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink,
            },
            stream: { llseek: MEMFS.stream_ops.llseek },
          },
          file: {
            node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync,
            },
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink,
            },
            stream: {},
          },
          chrdev: {
            node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
            stream: FS.chrdev_stream_ops,
          },
        }
      }
      var node = FS.createNode(parent, name, mode, dev)
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node
        node.stream_ops = MEMFS.ops_table.dir.stream
        node.contents = {}
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node
        node.stream_ops = MEMFS.ops_table.file.stream
        node.usedBytes = 0
        node.contents = null
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node
        node.stream_ops = MEMFS.ops_table.link.stream
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node
        node.stream_ops = MEMFS.ops_table.chrdev.stream
      }
      node.timestamp = Date.now()
      if (parent) {
        parent.contents[name] = node
      }
      return node
    },
    getFileDataAsRegularArray: function (node) {
      if (node.contents && node.contents.subarray) {
        var arr = []
        for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i])
        return arr
      }
      return node.contents
    },
    getFileDataAsTypedArray: function (node) {
      if (!node.contents) return new Uint8Array()
      if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes)
      return new Uint8Array(node.contents)
    },
    expandFileStorage: function (node, newCapacity) {
      if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
        node.contents = MEMFS.getFileDataAsRegularArray(node)
        node.usedBytes = node.contents.length
      }
      if (!node.contents || node.contents.subarray) {
        var prevCapacity = node.contents ? node.contents.length : 0
        if (prevCapacity >= newCapacity) return
        var CAPACITY_DOUBLING_MAX = 1024 * 1024
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) | 0)
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
        var oldContents = node.contents
        node.contents = new Uint8Array(newCapacity)
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
        return
      }
      if (!node.contents && newCapacity > 0) node.contents = []
      while (node.contents.length < newCapacity) node.contents.push(0)
    },
    resizeFileStorage: function (node, newSize) {
      if (node.usedBytes == newSize) return
      if (newSize == 0) {
        node.contents = null
        node.usedBytes = 0
        return
      }
      if (!node.contents || node.contents.subarray) {
        var oldContents = node.contents
        node.contents = new Uint8Array(new ArrayBuffer(newSize))
        if (oldContents) {
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
        }
        node.usedBytes = newSize
        return
      }
      if (!node.contents) node.contents = []
      if (node.contents.length > newSize) node.contents.length = newSize
      else while (node.contents.length < newSize) node.contents.push(0)
      node.usedBytes = newSize
    },
    node_ops: {
      getattr: function (node) {
        var attr = {}
        attr.dev = FS.isChrdev(node.mode) ? node.id : 1
        attr.ino = node.id
        attr.mode = node.mode
        attr.nlink = 1
        attr.uid = 0
        attr.gid = 0
        attr.rdev = node.rdev
        if (FS.isDir(node.mode)) {
          attr.size = 4096
        } else if (FS.isFile(node.mode)) {
          attr.size = node.usedBytes
        } else if (FS.isLink(node.mode)) {
          attr.size = node.link.length
        } else {
          attr.size = 0
        }
        attr.atime = new Date(node.timestamp)
        attr.mtime = new Date(node.timestamp)
        attr.ctime = new Date(node.timestamp)
        attr.blksize = 4096
        attr.blocks = Math.ceil(attr.size / attr.blksize)
        return attr
      },
      setattr: function (node, attr) {
        if (attr.mode !== undefined) {
          node.mode = attr.mode
        }
        if (attr.timestamp !== undefined) {
          node.timestamp = attr.timestamp
        }
        if (attr.size !== undefined) {
          MEMFS.resizeFileStorage(node, attr.size)
        }
      },
      lookup: function (parent, name) {
        throw FS.genericErrors[ERRNO_CODES.ENOENT]
      },
      mknod: function (parent, name, mode, dev) {
        return MEMFS.createNode(parent, name, mode, dev)
      },
      rename: function (old_node, new_dir, new_name) {
        if (FS.isDir(old_node.mode)) {
          var new_node
          try {
            new_node = FS.lookupNode(new_dir, new_name)
          } catch (e) {}
          if (new_node) {
            for (var i in new_node.contents) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
            }
          }
        }
        delete old_node.parent.contents[old_node.name]
        old_node.name = new_name
        new_dir.contents[new_name] = old_node
        old_node.parent = new_dir
      },
      unlink: function (parent, name) {
        delete parent.contents[name]
      },
      rmdir: function (parent, name) {
        var node = FS.lookupNode(parent, name)
        for (var i in node.contents) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
        }
        delete parent.contents[name]
      },
      readdir: function (node) {
        var entries = ['.', '..']
        for (var key in node.contents) {
          if (!node.contents.hasOwnProperty(key)) {
            continue
          }
          entries.push(key)
        }
        return entries
      },
      symlink: function (parent, newname, oldpath) {
        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
        node.link = oldpath
        return node
      },
      readlink: function (node) {
        if (!FS.isLink(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
        }
        return node.link
      },
    },
    stream_ops: {
      read: function (stream, buffer, offset, length, position) {
        var contents = stream.node.contents
        if (position >= stream.node.usedBytes) return 0
        var size = Math.min(stream.node.usedBytes - position, length)
        assert(size >= 0)
        if (size > 8 && contents.subarray) {
          buffer.set(contents.subarray(position, position + size), offset)
        } else {
          for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i]
        }
        return size
      },
      write: function (stream, buffer, offset, length, position, canOwn) {
        if (!length) return 0
        var node = stream.node
        node.timestamp = Date.now()
        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
          if (canOwn) {
            node.contents = buffer.subarray(offset, offset + length)
            node.usedBytes = length
            return length
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = new Uint8Array(buffer.subarray(offset, offset + length))
            node.usedBytes = length
            return length
          } else if (position + length <= node.usedBytes) {
            node.contents.set(buffer.subarray(offset, offset + length), position)
            return length
          }
        }
        MEMFS.expandFileStorage(node, position + length)
        if (node.contents.subarray && buffer.subarray)
          node.contents.set(buffer.subarray(offset, offset + length), position)
        else {
          for (var i = 0; i < length; i++) {
            node.contents[position + i] = buffer[offset + i]
          }
        }
        node.usedBytes = Math.max(node.usedBytes, position + length)
        return length
      },
      llseek: function (stream, offset, whence) {
        var position = offset
        if (whence === 1) {
          position += stream.position
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.usedBytes
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
        }
        return position
      },
      allocate: function (stream, offset, length) {
        MEMFS.expandFileStorage(stream.node, offset + length)
        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
      },
      mmap: function (stream, buffer, offset, length, position, prot, flags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
        }
        var ptr
        var allocated
        var contents = stream.node.contents
        if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
          allocated = false
          ptr = contents.byteOffset
        } else {
          if (position > 0 || position + length < stream.node.usedBytes) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length)
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length)
            }
          }
          allocated = true
          ptr = _malloc(length)
          if (!ptr) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOMEM)
          }
          buffer.set(contents, ptr)
        }
        return { ptr: ptr, allocated: allocated }
      },
      msync: function (stream, buffer, offset, length, mmapFlags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
        }
        if (mmapFlags & 2) {
          return 0
        }
        var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false)
        return 0
      },
    },
  }
  var IDBFS = {
    dbs: {},
    indexedDB: function () {
      if (typeof indexedDB !== 'undefined') return indexedDB
      var ret = null
      if (typeof window === 'object')
        ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      assert(ret, 'IDBFS used, but indexedDB not supported')
      return ret
    },
    DB_VERSION: 21,
    DB_STORE_NAME: 'FILE_DATA',
    mount: function (mount) {
      return MEMFS.mount.apply(null, arguments)
    },
    syncfs: function (mount, populate, callback) {
      IDBFS.getLocalSet(mount, function (err, local) {
        if (err) return callback(err)
        IDBFS.getRemoteSet(mount, function (err, remote) {
          if (err) return callback(err)
          var src = populate ? remote : local
          var dst = populate ? local : remote
          IDBFS.reconcile(src, dst, callback)
        })
      })
    },
    getDB: function (name, callback) {
      var db = IDBFS.dbs[name]
      if (db) {
        return callback(null, db)
      }
      var req
      try {
        req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION)
      } catch (e) {
        return callback(e)
      }
      if (!req) {
        return callback('Unable to connect to IndexedDB')
      }
      req.onupgradeneeded = function (e) {
        var db = e.target.result
        var transaction = e.target.transaction
        var fileStore
        if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
          fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME)
        } else {
          fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME)
        }
        if (!fileStore.indexNames.contains('timestamp')) {
          fileStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
      req.onsuccess = function () {
        db = req.result
        IDBFS.dbs[name] = db
        callback(null, db)
      }
      req.onerror = function (e) {
        callback(this.error)
        e.preventDefault()
      }
    },
    getLocalSet: function (mount, callback) {
      var entries = {}
      function isRealDir(p) {
        return p !== '.' && p !== '..'
      }
      function toAbsolute(root) {
        return function (p) {
          return PATH.join2(root, p)
        }
      }
      var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint))
      while (check.length) {
        var path = check.pop()
        var stat
        try {
          stat = FS.stat(path)
        } catch (e) {
          return callback(e)
        }
        if (FS.isDir(stat.mode)) {
          check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))
        }
        entries[path] = { timestamp: stat.mtime }
      }
      return callback(null, { type: 'local', entries: entries })
    },
    getRemoteSet: function (mount, callback) {
      var entries = {}
      IDBFS.getDB(mount.mountpoint, function (err, db) {
        if (err) return callback(err)
        try {
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly')
          transaction.onerror = function (e) {
            callback(this.error)
            e.preventDefault()
          }
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME)
          var index = store.index('timestamp')
          index.openKeyCursor().onsuccess = function (event) {
            var cursor = event.target.result
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries })
            }
            entries[cursor.primaryKey] = { timestamp: cursor.key }
            cursor.continue()
          }
        } catch (e) {
          return callback(e)
        }
      })
    },
    loadLocalEntry: function (path, callback) {
      var stat, node
      try {
        var lookup = FS.lookupPath(path)
        node = lookup.node
        stat = FS.stat(path)
      } catch (e) {
        return callback(e)
      }
      if (FS.isDir(stat.mode)) {
        return callback(null, { timestamp: stat.mtime, mode: stat.mode })
      } else if (FS.isFile(stat.mode)) {
        node.contents = MEMFS.getFileDataAsTypedArray(node)
        return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents })
      } else {
        return callback(new Error('node type not supported'))
      }
    },
    storeLocalEntry: function (path, entry, callback) {
      try {
        if (FS.isDir(entry.mode)) {
          FS.mkdir(path, entry.mode)
        } else if (FS.isFile(entry.mode)) {
          FS.writeFile(path, entry.contents, { canOwn: true })
        } else {
          return callback(new Error('node type not supported'))
        }
        FS.chmod(path, entry.mode)
        FS.utime(path, entry.timestamp, entry.timestamp)
      } catch (e) {
        return callback(e)
      }
      callback(null)
    },
    removeLocalEntry: function (path, callback) {
      try {
        var lookup = FS.lookupPath(path)
        var stat = FS.stat(path)
        if (FS.isDir(stat.mode)) {
          FS.rmdir(path)
        } else if (FS.isFile(stat.mode)) {
          FS.unlink(path)
        }
      } catch (e) {
        return callback(e)
      }
      callback(null)
    },
    loadRemoteEntry: function (store, path, callback) {
      var req = store.get(path)
      req.onsuccess = function (event) {
        callback(null, event.target.result)
      }
      req.onerror = function (e) {
        callback(this.error)
        e.preventDefault()
      }
    },
    storeRemoteEntry: function (store, path, entry, callback) {
      var req = store.put(entry, path)
      req.onsuccess = function () {
        callback(null)
      }
      req.onerror = function (e) {
        callback(this.error)
        e.preventDefault()
      }
    },
    removeRemoteEntry: function (store, path, callback) {
      var req = store.delete(path)
      req.onsuccess = function () {
        callback(null)
      }
      req.onerror = function (e) {
        callback(this.error)
        e.preventDefault()
      }
    },
    reconcile: function (src, dst, callback) {
      var total = 0
      var create = []
      Object.keys(src.entries).forEach(function (key) {
        var e = src.entries[key]
        var e2 = dst.entries[key]
        if (!e2 || e.timestamp > e2.timestamp) {
          create.push(key)
          total++
        }
      })
      var remove = []
      Object.keys(dst.entries).forEach(function (key) {
        var e = dst.entries[key]
        var e2 = src.entries[key]
        if (!e2) {
          remove.push(key)
          total++
        }
      })
      if (!total) {
        return callback(null)
      }
      var completed = 0
      var db = src.type === 'remote' ? src.db : dst.db
      var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite')
      var store = transaction.objectStore(IDBFS.DB_STORE_NAME)
      function done(err) {
        if (err) {
          if (!done.errored) {
            done.errored = true
            return callback(err)
          }
          return
        }
        if (++completed >= total) {
          return callback(null)
        }
      }
      transaction.onerror = function (e) {
        done(this.error)
        e.preventDefault()
      }
      create.sort().forEach(function (path) {
        if (dst.type === 'local') {
          IDBFS.loadRemoteEntry(store, path, function (err, entry) {
            if (err) return done(err)
            IDBFS.storeLocalEntry(path, entry, done)
          })
        } else {
          IDBFS.loadLocalEntry(path, function (err, entry) {
            if (err) return done(err)
            IDBFS.storeRemoteEntry(store, path, entry, done)
          })
        }
      })
      remove
        .sort()
        .reverse()
        .forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done)
          } else {
            IDBFS.removeRemoteEntry(store, path, done)
          }
        })
    },
  }
  var NODEFS = {
    isWindows: false,
    staticInit: function () {
      NODEFS.isWindows = !!process.platform.match(/^win/)
      var flags = process['binding']('constants')
      if (flags['fs']) {
        flags = flags['fs']
      }
      NODEFS.flagsForNodeMap = {
        1024: flags['O_APPEND'],
        64: flags['O_CREAT'],
        128: flags['O_EXCL'],
        0: flags['O_RDONLY'],
        2: flags['O_RDWR'],
        4096: flags['O_SYNC'],
        512: flags['O_TRUNC'],
        1: flags['O_WRONLY'],
      }
    },
    bufferFrom: function (arrayBuffer) {
      return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer)
    },
    mount: function (mount) {
      assert(ENVIRONMENT_IS_NODE)
      return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0)
    },
    createNode: function (parent, name, mode, dev) {
      if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      var node = FS.createNode(parent, name, mode)
      node.node_ops = NODEFS.node_ops
      node.stream_ops = NODEFS.stream_ops
      return node
    },
    getMode: function (path) {
      var stat
      try {
        stat = fs.lstatSync(path)
        if (NODEFS.isWindows) {
          stat.mode = stat.mode | ((stat.mode & 292) >> 2)
        }
      } catch (e) {
        if (!e.code) throw e
        throw new FS.ErrnoError(ERRNO_CODES[e.code])
      }
      return stat.mode
    },
    realPath: function (node) {
      var parts = []
      while (node.parent !== node) {
        parts.push(node.name)
        node = node.parent
      }
      parts.push(node.mount.opts.root)
      parts.reverse()
      return PATH.join.apply(null, parts)
    },
    flagsForNode: function (flags) {
      flags &= ~2097152
      flags &= ~2048
      flags &= ~32768
      flags &= ~524288
      var newFlags = 0
      for (var k in NODEFS.flagsForNodeMap) {
        if (flags & k) {
          newFlags |= NODEFS.flagsForNodeMap[k]
          flags ^= k
        }
      }
      if (!flags) {
        return newFlags
      } else {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
    },
    node_ops: {
      getattr: function (node) {
        var path = NODEFS.realPath(node)
        var stat
        try {
          stat = fs.lstatSync(path)
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
        if (NODEFS.isWindows && !stat.blksize) {
          stat.blksize = 4096
        }
        if (NODEFS.isWindows && !stat.blocks) {
          stat.blocks = ((stat.size + stat.blksize - 1) / stat.blksize) | 0
        }
        return {
          dev: stat.dev,
          ino: stat.ino,
          mode: stat.mode,
          nlink: stat.nlink,
          uid: stat.uid,
          gid: stat.gid,
          rdev: stat.rdev,
          size: stat.size,
          atime: stat.atime,
          mtime: stat.mtime,
          ctime: stat.ctime,
          blksize: stat.blksize,
          blocks: stat.blocks,
        }
      },
      setattr: function (node, attr) {
        var path = NODEFS.realPath(node)
        try {
          if (attr.mode !== undefined) {
            fs.chmodSync(path, attr.mode)
            node.mode = attr.mode
          }
          if (attr.timestamp !== undefined) {
            var date = new Date(attr.timestamp)
            fs.utimesSync(path, date, date)
          }
          if (attr.size !== undefined) {
            fs.truncateSync(path, attr.size)
          }
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      lookup: function (parent, name) {
        var path = PATH.join2(NODEFS.realPath(parent), name)
        var mode = NODEFS.getMode(path)
        return NODEFS.createNode(parent, name, mode)
      },
      mknod: function (parent, name, mode, dev) {
        var node = NODEFS.createNode(parent, name, mode, dev)
        var path = NODEFS.realPath(node)
        try {
          if (FS.isDir(node.mode)) {
            fs.mkdirSync(path, node.mode)
          } else {
            fs.writeFileSync(path, '', { mode: node.mode })
          }
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
        return node
      },
      rename: function (oldNode, newDir, newName) {
        var oldPath = NODEFS.realPath(oldNode)
        var newPath = PATH.join2(NODEFS.realPath(newDir), newName)
        try {
          fs.renameSync(oldPath, newPath)
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      unlink: function (parent, name) {
        var path = PATH.join2(NODEFS.realPath(parent), name)
        try {
          fs.unlinkSync(path)
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      rmdir: function (parent, name) {
        var path = PATH.join2(NODEFS.realPath(parent), name)
        try {
          fs.rmdirSync(path)
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      readdir: function (node) {
        var path = NODEFS.realPath(node)
        try {
          return fs.readdirSync(path)
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      symlink: function (parent, newName, oldPath) {
        var newPath = PATH.join2(NODEFS.realPath(parent), newName)
        try {
          fs.symlinkSync(oldPath, newPath)
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      readlink: function (node) {
        var path = NODEFS.realPath(node)
        try {
          path = fs.readlinkSync(path)
          path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path)
          return path
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
    },
    stream_ops: {
      open: function (stream) {
        var path = NODEFS.realPath(stream.node)
        try {
          if (FS.isFile(stream.node.mode)) {
            stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags))
          }
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      close: function (stream) {
        try {
          if (FS.isFile(stream.node.mode) && stream.nfd) {
            fs.closeSync(stream.nfd)
          }
        } catch (e) {
          if (!e.code) throw e
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      read: function (stream, buffer, offset, length, position) {
        if (length === 0) return 0
        try {
          return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position)
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      write: function (stream, buffer, offset, length, position) {
        try {
          return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position)
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES[e.code])
        }
      },
      llseek: function (stream, offset, whence) {
        var position = offset
        if (whence === 1) {
          position += stream.position
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            try {
              var stat = fs.fstatSync(stream.nfd)
              position += stat.size
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES[e.code])
            }
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
        }
        return position
      },
    },
  }
  var WORKERFS = {
    DIR_MODE: 16895,
    FILE_MODE: 33279,
    reader: null,
    mount: function (mount) {
      assert(ENVIRONMENT_IS_WORKER)
      if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync()
      var root = WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0)
      var createdParents = {}
      function ensureParent(path) {
        var parts = path.split('/')
        var parent = root
        for (var i = 0; i < parts.length - 1; i++) {
          var curr = parts.slice(0, i + 1).join('/')
          if (!createdParents[curr]) {
            createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0)
          }
          parent = createdParents[curr]
        }
        return parent
      }
      function base(path) {
        var parts = path.split('/')
        return parts[parts.length - 1]
      }
      Array.prototype.forEach.call(mount.opts['files'] || [], function (file) {
        WORKERFS.createNode(
          ensureParent(file.name),
          base(file.name),
          WORKERFS.FILE_MODE,
          0,
          file,
          file.lastModifiedDate
        )
      })
      ;(mount.opts['blobs'] || []).forEach(function (obj) {
        WORKERFS.createNode(ensureParent(obj['name']), base(obj['name']), WORKERFS.FILE_MODE, 0, obj['data'])
      })
      ;(mount.opts['packages'] || []).forEach(function (pack) {
        pack['metadata'].files.forEach(function (file) {
          var name = file.filename.substr(1)
          WORKERFS.createNode(
            ensureParent(name),
            base(name),
            WORKERFS.FILE_MODE,
            0,
            pack['blob'].slice(file.start, file.end)
          )
        })
      })
      return root
    },
    createNode: function (parent, name, mode, dev, contents, mtime) {
      var node = FS.createNode(parent, name, mode)
      node.mode = mode
      node.node_ops = WORKERFS.node_ops
      node.stream_ops = WORKERFS.stream_ops
      node.timestamp = (mtime || new Date()).getTime()
      assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE)
      if (mode === WORKERFS.FILE_MODE) {
        node.size = contents.size
        node.contents = contents
      } else {
        node.size = 4096
        node.contents = {}
      }
      if (parent) {
        parent.contents[name] = node
      }
      return node
    },
    node_ops: {
      getattr: function (node) {
        return {
          dev: 1,
          ino: undefined,
          mode: node.mode,
          nlink: 1,
          uid: 0,
          gid: 0,
          rdev: undefined,
          size: node.size,
          atime: new Date(node.timestamp),
          mtime: new Date(node.timestamp),
          ctime: new Date(node.timestamp),
          blksize: 4096,
          blocks: Math.ceil(node.size / 4096),
        }
      },
      setattr: function (node, attr) {
        if (attr.mode !== undefined) {
          node.mode = attr.mode
        }
        if (attr.timestamp !== undefined) {
          node.timestamp = attr.timestamp
        }
      },
      lookup: function (parent, name) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      },
      mknod: function (parent, name, mode, dev) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      },
      rename: function (oldNode, newDir, newName) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      },
      unlink: function (parent, name) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      },
      rmdir: function (parent, name) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      },
      readdir: function (node) {
        var entries = ['.', '..']
        for (var key in node.contents) {
          if (!node.contents.hasOwnProperty(key)) {
            continue
          }
          entries.push(key)
        }
        return entries
      },
      symlink: function (parent, newName, oldPath) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      },
      readlink: function (node) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      },
    },
    stream_ops: {
      read: function (stream, buffer, offset, length, position) {
        if (position >= stream.node.size) return 0
        var chunk = stream.node.contents.slice(position, position + length)
        var ab = WORKERFS.reader.readAsArrayBuffer(chunk)
        buffer.set(new Uint8Array(ab), offset)
        return chunk.size
      },
      write: function (stream, buffer, offset, length, position) {
        throw new FS.ErrnoError(ERRNO_CODES.EIO)
      },
      llseek: function (stream, offset, whence) {
        var position = offset
        if (whence === 1) {
          position += stream.position
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.size
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
        }
        return position
      },
    },
  }
  STATICTOP += 16
  STATICTOP += 16
  STATICTOP += 16
  var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: '/',
    initialized: false,
    ignorePermissions: true,
    trackingDelegate: {},
    tracking: { openFlags: { READ: 1, WRITE: 2 } },
    ErrnoError: null,
    genericErrors: {},
    filesystems: null,
    syncFSRequests: 0,
    handleFSError: function (e) {
      if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace()
      return ___setErrNo(e.errno)
    },
    lookupPath: function (path, opts) {
      path = PATH.resolve(FS.cwd(), path)
      opts = opts || {}
      if (!path) return { path: '', node: null }
      var defaults = { follow_mount: true, recurse_count: 0 }
      for (var key in defaults) {
        if (opts[key] === undefined) {
          opts[key] = defaults[key]
        }
      }
      if (opts.recurse_count > 8) {
        throw new FS.ErrnoError(ERRNO_CODES.ELOOP)
      }
      var parts = PATH.normalizeArray(
        path.split('/').filter(function (p) {
          return !!p
        }),
        false
      )
      var current = FS.root
      var current_path = '/'
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1
        if (islast && opts.parent) {
          break
        }
        current = FS.lookupNode(current, parts[i])
        current_path = PATH.join2(current_path, parts[i])
        if (FS.isMountpoint(current)) {
          if (!islast || (islast && opts.follow_mount)) {
            current = current.mounted.root
          }
        }
        if (!islast || opts.follow) {
          var count = 0
          while (FS.isLink(current.mode)) {
            var link = FS.readlink(current_path)
            current_path = PATH.resolve(PATH.dirname(current_path), link)
            var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count })
            current = lookup.node
            if (count++ > 40) {
              throw new FS.ErrnoError(ERRNO_CODES.ELOOP)
            }
          }
        }
      }
      return { path: current_path, node: current }
    },
    getPath: function (node) {
      var path
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint
          if (!path) return mount
          return mount[mount.length - 1] !== '/' ? mount + '/' + path : mount + path
        }
        path = path ? node.name + '/' + path : node.name
        node = node.parent
      }
    },
    hashName: function (parentid, name) {
      var hash = 0
      for (var i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
      }
      return ((parentid + hash) >>> 0) % FS.nameTable.length
    },
    hashAddNode: function (node) {
      var hash = FS.hashName(node.parent.id, node.name)
      node.name_next = FS.nameTable[hash]
      FS.nameTable[hash] = node
    },
    hashRemoveNode: function (node) {
      var hash = FS.hashName(node.parent.id, node.name)
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next
      } else {
        var current = FS.nameTable[hash]
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next
            break
          }
          current = current.name_next
        }
      }
    },
    lookupNode: function (parent, name) {
      var err = FS.mayLookup(parent)
      if (err) {
        throw new FS.ErrnoError(err, parent)
      }
      var hash = FS.hashName(parent.id, name)
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name
        if (node.parent.id === parent.id && nodeName === name) {
          return node
        }
      }
      return FS.lookup(parent, name)
    },
    createNode: function (parent, name, mode, rdev) {
      if (!FS.FSNode) {
        FS.FSNode = function (parent, name, mode, rdev) {
          if (!parent) {
            parent = this
          }
          this.parent = parent
          this.mount = parent.mount
          this.mounted = null
          this.id = FS.nextInode++
          this.name = name
          this.mode = mode
          this.node_ops = {}
          this.stream_ops = {}
          this.rdev = rdev
        }
        FS.FSNode.prototype = {}
        var readMode = 292 | 73
        var writeMode = 146
        Object.defineProperties(FS.FSNode.prototype, {
          read: {
            get: function () {
              return (this.mode & readMode) === readMode
            },
            set: function (val) {
              val ? (this.mode |= readMode) : (this.mode &= ~readMode)
            },
          },
          write: {
            get: function () {
              return (this.mode & writeMode) === writeMode
            },
            set: function (val) {
              val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
            },
          },
          isFolder: {
            get: function () {
              return FS.isDir(this.mode)
            },
          },
          isDevice: {
            get: function () {
              return FS.isChrdev(this.mode)
            },
          },
        })
      }
      var node = new FS.FSNode(parent, name, mode, rdev)
      FS.hashAddNode(node)
      return node
    },
    destroyNode: function (node) {
      FS.hashRemoveNode(node)
    },
    isRoot: function (node) {
      return node === node.parent
    },
    isMountpoint: function (node) {
      return !!node.mounted
    },
    isFile: function (mode) {
      return (mode & 61440) === 32768
    },
    isDir: function (mode) {
      return (mode & 61440) === 16384
    },
    isLink: function (mode) {
      return (mode & 61440) === 40960
    },
    isChrdev: function (mode) {
      return (mode & 61440) === 8192
    },
    isBlkdev: function (mode) {
      return (mode & 61440) === 24576
    },
    isFIFO: function (mode) {
      return (mode & 61440) === 4096
    },
    isSocket: function (mode) {
      return (mode & 49152) === 49152
    },
    flagModes: {
      r: 0,
      rs: 1052672,
      'r+': 2,
      w: 577,
      wx: 705,
      xw: 705,
      'w+': 578,
      'wx+': 706,
      'xw+': 706,
      a: 1089,
      ax: 1217,
      xa: 1217,
      'a+': 1090,
      'ax+': 1218,
      'xa+': 1218,
    },
    modeStringToFlags: function (str) {
      var flags = FS.flagModes[str]
      if (typeof flags === 'undefined') {
        throw new Error('Unknown file open mode: ' + str)
      }
      return flags
    },
    flagsToPermissionString: function (flag) {
      var perms = ['r', 'w', 'rw'][flag & 3]
      if (flag & 512) {
        perms += 'w'
      }
      return perms
    },
    nodePermissions: function (node, perms) {
      if (FS.ignorePermissions) {
        return 0
      }
      if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
        return ERRNO_CODES.EACCES
      } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
        return ERRNO_CODES.EACCES
      } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
        return ERRNO_CODES.EACCES
      }
      return 0
    },
    mayLookup: function (dir) {
      var err = FS.nodePermissions(dir, 'x')
      if (err) return err
      if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES
      return 0
    },
    mayCreate: function (dir, name) {
      try {
        var node = FS.lookupNode(dir, name)
        return ERRNO_CODES.EEXIST
      } catch (e) {}
      return FS.nodePermissions(dir, 'wx')
    },
    mayDelete: function (dir, name, isdir) {
      var node
      try {
        node = FS.lookupNode(dir, name)
      } catch (e) {
        return e.errno
      }
      var err = FS.nodePermissions(dir, 'wx')
      if (err) {
        return err
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return ERRNO_CODES.ENOTDIR
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return ERRNO_CODES.EBUSY
        }
      } else {
        if (FS.isDir(node.mode)) {
          return ERRNO_CODES.EISDIR
        }
      }
      return 0
    },
    mayOpen: function (node, flags) {
      if (!node) {
        return ERRNO_CODES.ENOENT
      }
      if (FS.isLink(node.mode)) {
        return ERRNO_CODES.ELOOP
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
          return ERRNO_CODES.EISDIR
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
    },
    MAX_OPEN_FDS: 4096,
    nextfd: function (fd_start, fd_end) {
      fd_start = fd_start || 0
      fd_end = fd_end || FS.MAX_OPEN_FDS
      for (var fd = fd_start; fd <= fd_end; fd++) {
        if (!FS.streams[fd]) {
          return fd
        }
      }
      throw new FS.ErrnoError(ERRNO_CODES.EMFILE)
    },
    getStream: function (fd) {
      return FS.streams[fd]
    },
    createStream: function (stream, fd_start, fd_end) {
      if (!FS.FSStream) {
        FS.FSStream = function () {}
        FS.FSStream.prototype = {}
        Object.defineProperties(FS.FSStream.prototype, {
          object: {
            get: function () {
              return this.node
            },
            set: function (val) {
              this.node = val
            },
          },
          isRead: {
            get: function () {
              return (this.flags & 2097155) !== 1
            },
          },
          isWrite: {
            get: function () {
              return (this.flags & 2097155) !== 0
            },
          },
          isAppend: {
            get: function () {
              return this.flags & 1024
            },
          },
        })
      }
      var newStream = new FS.FSStream()
      for (var p in stream) {
        newStream[p] = stream[p]
      }
      stream = newStream
      var fd = FS.nextfd(fd_start, fd_end)
      stream.fd = fd
      FS.streams[fd] = stream
      return stream
    },
    closeStream: function (fd) {
      FS.streams[fd] = null
    },
    chrdev_stream_ops: {
      open: function (stream) {
        var device = FS.getDevice(stream.node.rdev)
        stream.stream_ops = device.stream_ops
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream)
        }
      },
      llseek: function () {
        throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
      },
    },
    major: function (dev) {
      return dev >> 8
    },
    minor: function (dev) {
      return dev & 255
    },
    makedev: function (ma, mi) {
      return (ma << 8) | mi
    },
    registerDevice: function (dev, ops) {
      FS.devices[dev] = { stream_ops: ops }
    },
    getDevice: function (dev) {
      return FS.devices[dev]
    },
    getMounts: function (mount) {
      var mounts = []
      var check = [mount]
      while (check.length) {
        var m = check.pop()
        mounts.push(m)
        check.push.apply(check, m.mounts)
      }
      return mounts
    },
    syncfs: function (populate, callback) {
      if (typeof populate === 'function') {
        callback = populate
        populate = false
      }
      FS.syncFSRequests++
      if (FS.syncFSRequests > 1) {
        console.log(
          'warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work'
        )
      }
      var mounts = FS.getMounts(FS.root.mount)
      var completed = 0
      function doCallback(err) {
        assert(FS.syncFSRequests > 0)
        FS.syncFSRequests--
        return callback(err)
      }
      function done(err) {
        if (err) {
          if (!done.errored) {
            done.errored = true
            return doCallback(err)
          }
          return
        }
        if (++completed >= mounts.length) {
          doCallback(null)
        }
      }
      mounts.forEach(function (mount) {
        if (!mount.type.syncfs) {
          return done(null)
        }
        mount.type.syncfs(mount, populate, done)
      })
    },
    mount: function (type, opts, mountpoint) {
      var root = mountpoint === '/'
      var pseudo = !mountpoint
      var node
      if (root && FS.root) {
        throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
        mountpoint = lookup.path
        node = lookup.node
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
        }
      }
      var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }
      var mountRoot = type.mount(mount)
      mountRoot.mount = mount
      mount.root = mountRoot
      if (root) {
        FS.root = mountRoot
      } else if (node) {
        node.mounted = mount
        if (node.mount) {
          node.mount.mounts.push(mount)
        }
      }
      return mountRoot
    },
    unmount: function (mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      var node = lookup.node
      var mount = node.mounted
      var mounts = FS.getMounts(mount)
      Object.keys(FS.nameTable).forEach(function (hash) {
        var current = FS.nameTable[hash]
        while (current) {
          var next = current.name_next
          if (mounts.indexOf(current.mount) !== -1) {
            FS.destroyNode(current)
          }
          current = next
        }
      })
      node.mounted = null
      var idx = node.mount.mounts.indexOf(mount)
      assert(idx !== -1)
      node.mount.mounts.splice(idx, 1)
    },
    lookup: function (parent, name) {
      return parent.node_ops.lookup(parent, name)
    },
    mknod: function (path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      if (!name || name === '.' || name === '..') {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      var err = FS.mayCreate(parent, name)
      if (err) {
        throw new FS.ErrnoError(err)
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      return parent.node_ops.mknod(parent, name, mode, dev)
    },
    create: function (path, mode) {
      mode = mode !== undefined ? mode : 438
      mode &= 4095
      mode |= 32768
      return FS.mknod(path, mode, 0)
    },
    mkdir: function (path, mode) {
      mode = mode !== undefined ? mode : 511
      mode &= 511 | 512
      mode |= 16384
      return FS.mknod(path, mode, 0)
    },
    mkdirTree: function (path, mode) {
      var dirs = path.split('/')
      var d = ''
      for (var i = 0; i < dirs.length; ++i) {
        if (!dirs[i]) continue
        d += '/' + dirs[i]
        try {
          FS.mkdir(d, mode)
        } catch (e) {
          if (e.errno != ERRNO_CODES.EEXIST) throw e
        }
      }
    },
    mkdev: function (path, mode, dev) {
      if (typeof dev === 'undefined') {
        dev = mode
        mode = 438
      }
      mode |= 8192
      return FS.mknod(path, mode, dev)
    },
    symlink: function (oldpath, newpath) {
      if (!PATH.resolve(oldpath)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      var lookup = FS.lookupPath(newpath, { parent: true })
      var parent = lookup.node
      if (!parent) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      var newname = PATH.basename(newpath)
      var err = FS.mayCreate(parent, newname)
      if (err) {
        throw new FS.ErrnoError(err)
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      return parent.node_ops.symlink(parent, newname, oldpath)
    },
    rename: function (old_path, new_path) {
      var old_dirname = PATH.dirname(old_path)
      var new_dirname = PATH.dirname(new_path)
      var old_name = PATH.basename(old_path)
      var new_name = PATH.basename(new_path)
      var lookup, old_dir, new_dir
      try {
        lookup = FS.lookupPath(old_path, { parent: true })
        old_dir = lookup.node
        lookup = FS.lookupPath(new_path, { parent: true })
        new_dir = lookup.node
      } catch (e) {
        throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
      }
      if (!old_dir || !new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(ERRNO_CODES.EXDEV)
      }
      var old_node = FS.lookupNode(old_dir, old_name)
      var relative = PATH.relative(old_path, new_dirname)
      if (relative.charAt(0) !== '.') {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      relative = PATH.relative(new_path, old_dirname)
      if (relative.charAt(0) !== '.') {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
      }
      var new_node
      try {
        new_node = FS.lookupNode(new_dir, new_name)
      } catch (e) {}
      if (old_node === new_node) {
        return
      }
      var isdir = FS.isDir(old_node.mode)
      var err = FS.mayDelete(old_dir, old_name, isdir)
      if (err) {
        throw new FS.ErrnoError(err)
      }
      err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name)
      if (err) {
        throw new FS.ErrnoError(err)
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
        throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
      }
      if (new_dir !== old_dir) {
        err = FS.nodePermissions(old_dir, 'w')
        if (err) {
          throw new FS.ErrnoError(err)
        }
      }
      try {
        if (FS.trackingDelegate['willMovePath']) {
          FS.trackingDelegate['willMovePath'](old_path, new_path)
        }
      } catch (e) {
        console.log(
          "FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message
        )
      }
      FS.hashRemoveNode(old_node)
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name)
      } catch (e) {
        throw e
      } finally {
        FS.hashAddNode(old_node)
      }
      try {
        if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path)
      } catch (e) {
        console.log(
          "FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message
        )
      }
    },
    rmdir: function (path) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      var node = FS.lookupNode(parent, name)
      var err = FS.mayDelete(parent, name, true)
      if (err) {
        throw new FS.ErrnoError(err)
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
      }
      try {
        if (FS.trackingDelegate['willDeletePath']) {
          FS.trackingDelegate['willDeletePath'](path)
        }
      } catch (e) {
        console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
      }
      parent.node_ops.rmdir(parent, name)
      FS.destroyNode(node)
      try {
        if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path)
      } catch (e) {
        console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
      }
    },
    readdir: function (path) {
      var lookup = FS.lookupPath(path, { follow: true })
      var node = lookup.node
      if (!node.node_ops.readdir) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
      }
      return node.node_ops.readdir(node)
    },
    unlink: function (path) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      var node = FS.lookupNode(parent, name)
      var err = FS.mayDelete(parent, name, false)
      if (err) {
        throw new FS.ErrnoError(err)
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
      }
      try {
        if (FS.trackingDelegate['willDeletePath']) {
          FS.trackingDelegate['willDeletePath'](path)
        }
      } catch (e) {
        console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
      }
      parent.node_ops.unlink(parent, name)
      FS.destroyNode(node)
      try {
        if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path)
      } catch (e) {
        console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
      }
    },
    readlink: function (path) {
      var lookup = FS.lookupPath(path)
      var link = lookup.node
      if (!link) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
    },
    stat: function (path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      var node = lookup.node
      if (!node) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      if (!node.node_ops.getattr) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      return node.node_ops.getattr(node)
    },
    lstat: function (path) {
      return FS.stat(path, true)
    },
    chmod: function (path, mode, dontFollow) {
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      node.node_ops.setattr(node, { mode: (mode & 4095) | (node.mode & ~4095), timestamp: Date.now() })
    },
    lchmod: function (path, mode) {
      FS.chmod(path, mode, true)
    },
    fchmod: function (fd, mode) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      FS.chmod(stream.node, mode)
    },
    chown: function (path, uid, gid, dontFollow) {
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      node.node_ops.setattr(node, { timestamp: Date.now() })
    },
    lchown: function (path, uid, gid) {
      FS.chown(path, uid, gid, true)
    },
    fchown: function (fd, uid, gid) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      FS.chown(stream.node, uid, gid)
    },
    truncate: function (path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: true })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(ERRNO_CODES.EPERM)
      }
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EISDIR)
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      var err = FS.nodePermissions(node, 'w')
      if (err) {
        throw new FS.ErrnoError(err)
      }
      node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
    },
    ftruncate: function (fd, len) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      FS.truncate(stream.node, len)
    },
    utime: function (path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true })
      var node = lookup.node
      node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
    },
    open: function (path, flags, mode, fd_start, fd_end) {
      if (path === '') {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags
      mode = typeof mode === 'undefined' ? 438 : mode
      if (flags & 64) {
        mode = (mode & 4095) | 32768
      } else {
        mode = 0
      }
      var node
      if (typeof path === 'object') {
        node = path
      } else {
        path = PATH.normalize(path)
        try {
          var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
          node = lookup.node
        } catch (e) {}
      }
      var created = false
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(ERRNO_CODES.EEXIST)
          }
        } else {
          node = FS.mknod(path, mode, 0)
          created = true
        }
      }
      if (!node) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
      }
      if (!created) {
        var err = FS.mayOpen(node, flags)
        if (err) {
          throw new FS.ErrnoError(err)
        }
      }
      if (flags & 512) {
        FS.truncate(node, 0)
      }
      flags &= ~(128 | 512)
      var stream = FS.createStream(
        {
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false,
        },
        fd_start,
        fd_end
      )
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream)
      }
      if (Module['logReadFiles'] && !(flags & 1)) {
        if (!FS.readFiles) FS.readFiles = {}
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1
          Module['printErr']('read file: ' + path)
        }
      }
      try {
        if (FS.trackingDelegate['onOpenFile']) {
          var trackingFlags = 0
          if ((flags & 2097155) !== 1) {
            trackingFlags |= FS.tracking.openFlags.READ
          }
          if ((flags & 2097155) !== 0) {
            trackingFlags |= FS.tracking.openFlags.WRITE
          }
          FS.trackingDelegate['onOpenFile'](path, trackingFlags)
        }
      } catch (e) {
        console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message)
      }
      return stream
    },
    close: function (stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if (stream.getdents) stream.getdents = null
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream)
        }
      } catch (e) {
        throw e
      } finally {
        FS.closeStream(stream.fd)
      }
      stream.fd = null
    },
    isClosed: function (stream) {
      return stream.fd === null
    },
    llseek: function (stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence)
      stream.ungotten = []
      return stream.position
    },
    read: function (stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EISDIR)
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      var seeking = typeof position !== 'undefined'
      if (!seeking) {
        position = stream.position
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
      }
      var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position)
      if (!seeking) stream.position += bytesRead
      return bytesRead
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.EISDIR)
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      if (stream.flags & 1024) {
        FS.llseek(stream, 0, 2)
      }
      var seeking = typeof position !== 'undefined'
      if (!seeking) {
        position = stream.position
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
      }
      var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn)
      if (!seeking) stream.position += bytesWritten
      try {
        if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path)
      } catch (e) {
        console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + e.message)
      }
      return bytesWritten
    },
    allocate: function (stream, offset, length) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if (offset < 0 || length <= 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      }
      if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
      }
      if (!stream.stream_ops.allocate) {
        throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
      }
      stream.stream_ops.allocate(stream, offset, length)
    },
    mmap: function (stream, buffer, offset, length, position, prot, flags) {
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(ERRNO_CODES.EACCES)
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
      }
      return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags)
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
      if (!stream || !stream.stream_ops.msync) {
        return 0
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
    },
    munmap: function (stream) {
      return 0
    },
    ioctl: function (stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTTY)
      }
      return stream.stream_ops.ioctl(stream, cmd, arg)
    },
    readFile: function (path, opts) {
      opts = opts || {}
      opts.flags = opts.flags || 'r'
      opts.encoding = opts.encoding || 'binary'
      if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
        throw new Error('Invalid encoding type "' + opts.encoding + '"')
      }
      var ret
      var stream = FS.open(path, opts.flags)
      var stat = FS.stat(path)
      var length = stat.size
      var buf = new Uint8Array(length)
      FS.read(stream, buf, 0, length, 0)
      if (opts.encoding === 'utf8') {
        ret = UTF8ArrayToString(buf, 0)
      } else if (opts.encoding === 'binary') {
        ret = buf
      }
      FS.close(stream)
      return ret
    },
    writeFile: function (path, data, opts) {
      opts = opts || {}
      opts.flags = opts.flags || 'w'
      var stream = FS.open(path, opts.flags, opts.mode)
      if (typeof data === 'string') {
        var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
        FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
      } else if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
      } else {
        throw new Error('Unsupported data type')
      }
      FS.close(stream)
    },
    cwd: function () {
      return FS.currentPath
    },
    chdir: function (path) {
      var lookup = FS.lookupPath(path, { follow: true })
      if (lookup.node === null) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
      }
      var err = FS.nodePermissions(lookup.node, 'x')
      if (err) {
        throw new FS.ErrnoError(err)
      }
      FS.currentPath = lookup.path
    },
    createDefaultDirectories: function () {
      FS.mkdir('/tmp')
      FS.mkdir('/home')
      FS.mkdir('/home/web_user')
    },
    createDefaultDevices: function () {
      FS.mkdir('/dev')
      FS.registerDevice(FS.makedev(1, 3), {
        read: function () {
          return 0
        },
        write: function (stream, buffer, offset, length, pos) {
          return length
        },
      })
      FS.mkdev('/dev/null', FS.makedev(1, 3))
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
      FS.mkdev('/dev/tty', FS.makedev(5, 0))
      FS.mkdev('/dev/tty1', FS.makedev(6, 0))
      var random_device
      if (typeof crypto !== 'undefined') {
        var randomBuffer = new Uint8Array(1)
        random_device = function () {
          crypto.getRandomValues(randomBuffer)
          return randomBuffer[0]
        }
      } else if (ENVIRONMENT_IS_NODE) {
        random_device = function () {
          return require('crypto')['randomBytes'](1)[0]
        }
      } else {
        random_device = function () {
          return (Math.random() * 256) | 0
        }
      }
      FS.createDevice('/dev', 'random', random_device)
      FS.createDevice('/dev', 'urandom', random_device)
      FS.mkdir('/dev/shm')
      FS.mkdir('/dev/shm/tmp')
    },
    createSpecialDirectories: function () {
      FS.mkdir('/proc')
      FS.mkdir('/proc/self')
      FS.mkdir('/proc/self/fd')
      FS.mount(
        {
          mount: function () {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511, 73)
            node.node_ops = {
              lookup: function (parent, name) {
                var fd = +name
                var stream = FS.getStream(fd)
                if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF)
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: {
                    readlink: function () {
                      return stream.path
                    },
                  },
                }
                ret.parent = ret
                return ret
              },
            }
            return node
          },
        },
        {},
        '/proc/self/fd'
      )
    },
    createStandardStreams: function () {
      if (Module['stdin']) {
        FS.createDevice('/dev', 'stdin', Module['stdin'])
      } else {
        FS.symlink('/dev/tty', '/dev/stdin')
      }
      if (Module['stdout']) {
        FS.createDevice('/dev', 'stdout', null, Module['stdout'])
      } else {
        FS.symlink('/dev/tty', '/dev/stdout')
      }
      if (Module['stderr']) {
        FS.createDevice('/dev', 'stderr', null, Module['stderr'])
      } else {
        FS.symlink('/dev/tty1', '/dev/stderr')
      }
      var stdin = FS.open('/dev/stdin', 'r')
      assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')')
      var stdout = FS.open('/dev/stdout', 'w')
      assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')')
      var stderr = FS.open('/dev/stderr', 'w')
      assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')')
    },
    ensureErrnoError: function () {
      if (FS.ErrnoError) return
      FS.ErrnoError = function ErrnoError(errno, node) {
        this.node = node
        this.setErrno = function (errno) {
          this.errno = errno
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key
              break
            }
          }
        }
        this.setErrno(errno)
        this.message = ERRNO_MESSAGES[errno]
        if (this.stack) Object.defineProperty(this, 'stack', { value: new Error().stack, writable: true })
      }
      FS.ErrnoError.prototype = new Error()
      FS.ErrnoError.prototype.constructor = FS.ErrnoError
      ;[ERRNO_CODES.ENOENT].forEach(function (code) {
        FS.genericErrors[code] = new FS.ErrnoError(code)
        FS.genericErrors[code].stack = '<generic error, no stack>'
      })
    },
    staticInit: function () {
      FS.ensureErrnoError()
      FS.nameTable = new Array(4096)
      FS.mount(MEMFS, {}, '/')
      FS.createDefaultDirectories()
      FS.createDefaultDevices()
      FS.createSpecialDirectories()
      FS.filesystems = { MEMFS: MEMFS, IDBFS: IDBFS, NODEFS: NODEFS, WORKERFS: WORKERFS }
    },
    init: function (input, output, error) {
      assert(
        !FS.init.initialized,
        'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)'
      )
      FS.init.initialized = true
      FS.ensureErrnoError()
      Module['stdin'] = input || Module['stdin']
      Module['stdout'] = output || Module['stdout']
      Module['stderr'] = error || Module['stderr']
      FS.createStandardStreams()
    },
    quit: function () {
      FS.init.initialized = false
      var fflush = Module['_fflush']
      if (fflush) fflush(0)
      for (var i = 0; i < FS.streams.length; i++) {
        var stream = FS.streams[i]
        if (!stream) {
          continue
        }
        FS.close(stream)
      }
    },
    getMode: function (canRead, canWrite) {
      var mode = 0
      if (canRead) mode |= 292 | 73
      if (canWrite) mode |= 146
      return mode
    },
    joinPath: function (parts, forceRelative) {
      var path = PATH.join.apply(null, parts)
      if (forceRelative && path[0] == '/') path = path.substr(1)
      return path
    },
    absolutePath: function (relative, base) {
      return PATH.resolve(base, relative)
    },
    standardizePath: function (path) {
      return PATH.normalize(path)
    },
    findObject: function (path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink)
      if (ret.exists) {
        return ret.object
      } else {
        ___setErrNo(ret.error)
        return null
      }
    },
    analyzePath: function (path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
        path = lookup.path
      } catch (e) {}
      var ret = {
        isRoot: false,
        exists: false,
        error: 0,
        name: null,
        path: null,
        object: null,
        parentExists: false,
        parentPath: null,
        parentObject: null,
      }
      try {
        var lookup = FS.lookupPath(path, { parent: true })
        ret.parentExists = true
        ret.parentPath = lookup.path
        ret.parentObject = lookup.node
        ret.name = PATH.basename(path)
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
        ret.exists = true
        ret.path = lookup.path
        ret.object = lookup.node
        ret.name = lookup.node.name
        ret.isRoot = lookup.path === '/'
      } catch (e) {
        ret.error = e.errno
      }
      return ret
    },
    createFolder: function (parent, name, canRead, canWrite) {
      var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
      var mode = FS.getMode(canRead, canWrite)
      return FS.mkdir(path, mode)
    },
    createPath: function (parent, path, canRead, canWrite) {
      parent = typeof parent === 'string' ? parent : FS.getPath(parent)
      var parts = path.split('/').reverse()
      while (parts.length) {
        var part = parts.pop()
        if (!part) continue
        var current = PATH.join2(parent, part)
        try {
          FS.mkdir(current)
        } catch (e) {}
        parent = current
      }
      return current
    },
    createFile: function (parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
      var mode = FS.getMode(canRead, canWrite)
      return FS.create(path, mode)
    },
    createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
      var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent
      var mode = FS.getMode(canRead, canWrite)
      var node = FS.create(path, mode)
      if (data) {
        if (typeof data === 'string') {
          var arr = new Array(data.length)
          for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i)
          data = arr
        }
        FS.chmod(node, mode | 146)
        var stream = FS.open(node, 'w')
        FS.write(stream, data, 0, data.length, 0, canOwn)
        FS.close(stream)
        FS.chmod(node, mode)
      }
      return node
    },
    createDevice: function (parent, name, input, output) {
      var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
      var mode = FS.getMode(!!input, !!output)
      if (!FS.createDevice.major) FS.createDevice.major = 64
      var dev = FS.makedev(FS.createDevice.major++, 0)
      FS.registerDevice(dev, {
        open: function (stream) {
          stream.seekable = false
        },
        close: function (stream) {
          if (output && output.buffer && output.buffer.length) {
            output(10)
          }
        },
        read: function (stream, buffer, offset, length, pos) {
          var bytesRead = 0
          for (var i = 0; i < length; i++) {
            var result
            try {
              result = input()
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO)
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
            }
            if (result === null || result === undefined) break
            bytesRead++
            buffer[offset + i] = result
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now()
          }
          return bytesRead
        },
        write: function (stream, buffer, offset, length, pos) {
          for (var i = 0; i < length; i++) {
            try {
              output(buffer[offset + i])
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO)
            }
          }
          if (length) {
            stream.node.timestamp = Date.now()
          }
          return i
        },
      })
      return FS.mkdev(path, mode, dev)
    },
    createLink: function (parent, name, target, canRead, canWrite) {
      var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
      return FS.symlink(target, path)
    },
    forceLoadFile: function (obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
      var success = true
      if (typeof XMLHttpRequest !== 'undefined') {
        throw new Error(
          'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
        )
      } else if (Module['read']) {
        try {
          obj.contents = intArrayFromString(Module['read'](obj.url), true)
          obj.usedBytes = obj.contents.length
        } catch (e) {
          success = false
        }
      } else {
        throw new Error('Cannot load without read() or XMLHttpRequest.')
      }
      if (!success) ___setErrNo(ERRNO_CODES.EIO)
      return success
    },
    createLazyFile: function (parent, name, url, canRead, canWrite) {
      function LazyUint8Array() {
        this.lengthKnown = false
        this.chunks = []
      }
      LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined
        }
        var chunkOffset = idx % this.chunkSize
        var chunkNum = (idx / this.chunkSize) | 0
        return this.getter(chunkNum)[chunkOffset]
      }
      LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
        this.getter = getter
      }
      LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url, false)
        xhr.send(null)
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
        var datalength = Number(xhr.getResponseHeader('Content-length'))
        var header
        var hasByteServing = (header = xhr.getResponseHeader('Accept-Ranges')) && header === 'bytes'
        var usesGzip = (header = xhr.getResponseHeader('Content-Encoding')) && header === 'gzip'
        var chunkSize = 1024 * 1024
        if (!hasByteServing) chunkSize = datalength
        var doXHR = function (from, to) {
          if (from > to) throw new Error('invalid range (' + from + ', ' + to + ') or no bytes requested!')
          if (to > datalength - 1) throw new Error('only ' + datalength + ' bytes available! programmer error!')
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          if (datalength !== chunkSize) xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to)
          if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer'
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined')
          }
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || [])
          } else {
            return intArrayFromString(xhr.responseText || '', true)
          }
        }
        var lazyArray = this
        lazyArray.setDataGetter(function (chunkNum) {
          var start = chunkNum * chunkSize
          var end = (chunkNum + 1) * chunkSize - 1
          end = Math.min(end, datalength - 1)
          if (typeof lazyArray.chunks[chunkNum] === 'undefined') {
            lazyArray.chunks[chunkNum] = doXHR(start, end)
          }
          if (typeof lazyArray.chunks[chunkNum] === 'undefined') throw new Error('doXHR failed!')
          return lazyArray.chunks[chunkNum]
        })
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1
          datalength = this.getter(0).length
          chunkSize = datalength
          console.log('LazyFiles on gzip forces download of the whole file when length is accessed')
        }
        this._length = datalength
        this._chunkSize = chunkSize
        this.lengthKnown = true
      }
      if (typeof XMLHttpRequest !== 'undefined') {
        if (!ENVIRONMENT_IS_WORKER)
          throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
        var lazyArray = new LazyUint8Array()
        Object.defineProperties(lazyArray, {
          length: {
            get: function () {
              if (!this.lengthKnown) {
                this.cacheLength()
              }
              return this._length
            },
          },
          chunkSize: {
            get: function () {
              if (!this.lengthKnown) {
                this.cacheLength()
              }
              return this._chunkSize
            },
          },
        })
        var properties = { isDevice: false, contents: lazyArray }
      } else {
        var properties = { isDevice: false, url: url }
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite)
      if (properties.contents) {
        node.contents = properties.contents
      } else if (properties.url) {
        node.contents = null
        node.url = properties.url
      }
      Object.defineProperties(node, {
        usedBytes: {
          get: function () {
            return this.contents.length
          },
        },
      })
      var stream_ops = {}
      var keys = Object.keys(node.stream_ops)
      keys.forEach(function (key) {
        var fn = node.stream_ops[key]
        stream_ops[key] = function forceLoadLazyFile() {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO)
          }
          return fn.apply(null, arguments)
        }
      })
      stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
        if (!FS.forceLoadFile(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO)
        }
        var contents = stream.node.contents
        if (position >= contents.length) return 0
        var size = Math.min(contents.length - position, length)
        assert(size >= 0)
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i]
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i)
          }
        }
        return size
      }
      node.stream_ops = stream_ops
      return node
    },
    createPreloadedFile: function (
      parent,
      name,
      url,
      canRead,
      canWrite,
      onload,
      onerror,
      dontCreateFile,
      canOwn,
      preFinish
    ) {
      Browser.init()
      var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent
      var dep = getUniqueRunDependency('cp ' + fullname)
      function processData(byteArray) {
        function finish(byteArray) {
          if (preFinish) preFinish()
          if (!dontCreateFile) {
            FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
          }
          if (onload) onload()
          removeRunDependency(dep)
        }
        var handled = false
        Module['preloadPlugins'].forEach(function (plugin) {
          if (handled) return
          if (plugin['canHandle'](fullname)) {
            plugin['handle'](byteArray, fullname, finish, function () {
              if (onerror) onerror()
              removeRunDependency(dep)
            })
            handled = true
          }
        })
        if (!handled) finish(byteArray)
      }
      addRunDependency(dep)
      if (typeof url == 'string') {
        Browser.asyncLoad(
          url,
          function (byteArray) {
            processData(byteArray)
          },
          onerror
        )
      } else {
        processData(url)
      }
    },
    indexedDB: function () {
      return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    },
    DB_NAME: function () {
      return 'EM_FS_' + window.location.pathname
    },
    DB_VERSION: 20,
    DB_STORE_NAME: 'FILE_DATA',
    saveFilesToDB: function (paths, onload, onerror) {
      onload = onload || function () {}
      onerror = onerror || function () {}
      var indexedDB = FS.indexedDB()
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
      } catch (e) {
        return onerror(e)
      }
      openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
        console.log('creating db')
        var db = openRequest.result
        db.createObjectStore(FS.DB_STORE_NAME)
      }
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result
        var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite')
        var files = transaction.objectStore(FS.DB_STORE_NAME)
        var ok = 0,
          fail = 0,
          total = paths.length
        function finish() {
          if (fail == 0) onload()
          else onerror()
        }
        paths.forEach(function (path) {
          var putRequest = files.put(FS.analyzePath(path).object.contents, path)
          putRequest.onsuccess = function putRequest_onsuccess() {
            ok++
            if (ok + fail == total) finish()
          }
          putRequest.onerror = function putRequest_onerror() {
            fail++
            if (ok + fail == total) finish()
          }
        })
        transaction.onerror = onerror
      }
      openRequest.onerror = onerror
    },
    loadFilesFromDB: function (paths, onload, onerror) {
      onload = onload || function () {}
      onerror = onerror || function () {}
      var indexedDB = FS.indexedDB()
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
      } catch (e) {
        return onerror(e)
      }
      openRequest.onupgradeneeded = onerror
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result
        try {
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly')
        } catch (e) {
          onerror(e)
          return
        }
        var files = transaction.objectStore(FS.DB_STORE_NAME)
        var ok = 0,
          fail = 0,
          total = paths.length
        function finish() {
          if (fail == 0) onload()
          else onerror()
        }
        paths.forEach(function (path) {
          var getRequest = files.get(path)
          getRequest.onsuccess = function getRequest_onsuccess() {
            if (FS.analyzePath(path).exists) {
              FS.unlink(path)
            }
            FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true)
            ok++
            if (ok + fail == total) finish()
          }
          getRequest.onerror = function getRequest_onerror() {
            fail++
            if (ok + fail == total) finish()
          }
        })
        transaction.onerror = onerror
      }
      openRequest.onerror = onerror
    },
  }
  var SYSCALLS = {
    DEFAULT_POLLMASK: 5,
    mappings: {},
    umask: 511,
    calculateAt: function (dirfd, path) {
      if (path[0] !== '/') {
        var dir
        if (dirfd === -100) {
          dir = FS.cwd()
        } else {
          var dirstream = FS.getStream(dirfd)
          if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF)
          dir = dirstream.path
        }
        path = PATH.join2(dir, path)
      }
      return path
    },
    doStat: function (func, path, buf) {
      try {
        var stat = func(path)
      } catch (e) {
        if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
          return -ERRNO_CODES.ENOTDIR
        }
        throw e
      }
      HEAP32[buf >> 2] = stat.dev
      HEAP32[(buf + 4) >> 2] = 0
      HEAP32[(buf + 8) >> 2] = stat.ino
      HEAP32[(buf + 12) >> 2] = stat.mode
      HEAP32[(buf + 16) >> 2] = stat.nlink
      HEAP32[(buf + 20) >> 2] = stat.uid
      HEAP32[(buf + 24) >> 2] = stat.gid
      HEAP32[(buf + 28) >> 2] = stat.rdev
      HEAP32[(buf + 32) >> 2] = 0
      HEAP32[(buf + 36) >> 2] = stat.size
      HEAP32[(buf + 40) >> 2] = 4096
      HEAP32[(buf + 44) >> 2] = stat.blocks
      HEAP32[(buf + 48) >> 2] = (stat.atime.getTime() / 1e3) | 0
      HEAP32[(buf + 52) >> 2] = 0
      HEAP32[(buf + 56) >> 2] = (stat.mtime.getTime() / 1e3) | 0
      HEAP32[(buf + 60) >> 2] = 0
      HEAP32[(buf + 64) >> 2] = (stat.ctime.getTime() / 1e3) | 0
      HEAP32[(buf + 68) >> 2] = 0
      HEAP32[(buf + 72) >> 2] = stat.ino
      return 0
    },
    doMsync: function (addr, stream, len, flags) {
      var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len))
      FS.msync(stream, buffer, 0, len, flags)
    },
    doMkdir: function (path, mode) {
      path = PATH.normalize(path)
      if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
      FS.mkdir(path, mode, 0)
      return 0
    },
    doMknod: function (path, mode, dev) {
      switch (mode & 61440) {
        case 32768:
        case 8192:
        case 24576:
        case 4096:
        case 49152:
          break
        default:
          return -ERRNO_CODES.EINVAL
      }
      FS.mknod(path, mode, dev)
      return 0
    },
    doReadlink: function (path, buf, bufsize) {
      if (bufsize <= 0) return -ERRNO_CODES.EINVAL
      var ret = FS.readlink(path)
      var len = Math.min(bufsize, lengthBytesUTF8(ret))
      var endChar = HEAP8[buf + len]
      stringToUTF8(ret, buf, bufsize + 1)
      HEAP8[buf + len] = endChar
      return len
    },
    doAccess: function (path, amode) {
      if (amode & ~7) {
        return -ERRNO_CODES.EINVAL
      }
      var node
      var lookup = FS.lookupPath(path, { follow: true })
      node = lookup.node
      var perms = ''
      if (amode & 4) perms += 'r'
      if (amode & 2) perms += 'w'
      if (amode & 1) perms += 'x'
      if (perms && FS.nodePermissions(node, perms)) {
        return -ERRNO_CODES.EACCES
      }
      return 0
    },
    doDup: function (path, flags, suggestFD) {
      var suggest = FS.getStream(suggestFD)
      if (suggest) FS.close(suggest)
      return FS.open(path, flags, 0, suggestFD, suggestFD).fd
    },
    doReadv: function (stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2]
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
        var curr = FS.read(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
        if (curr < len) break
      }
      return ret
    },
    doWritev: function (stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2]
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
        var curr = FS.write(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
      }
      return ret
    },
    varargs: 0,
    get: function (varargs) {
      SYSCALLS.varargs += 4
      var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2]
      return ret
    },
    getStr: function () {
      var ret = Pointer_stringify(SYSCALLS.get())
      return ret
    },
    getStreamFromFD: function () {
      var stream = FS.getStream(SYSCALLS.get())
      if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      return stream
    },
    getSocketFromFD: function () {
      var socket = SOCKFS.getSocket(SYSCALLS.get())
      if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF)
      return socket
    },
    getSocketAddress: function (allowNull) {
      var addrp = SYSCALLS.get(),
        addrlen = SYSCALLS.get()
      if (allowNull && addrp === 0) return null
      var info = __read_sockaddr(addrp, addrlen)
      if (info.errno) throw new FS.ErrnoError(info.errno)
      info.addr = DNS.lookup_addr(info.addr) || info.addr
      return info
    },
    get64: function () {
      var low = SYSCALLS.get(),
        high = SYSCALLS.get()
      if (low >= 0) assert(high === 0)
      else assert(high === -1)
      return low
    },
    getZero: function () {
      assert(SYSCALLS.get() === 0)
    },
  }
  function ___syscall140(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        offset_high = SYSCALLS.get(),
        offset_low = SYSCALLS.get(),
        result = SYSCALLS.get(),
        whence = SYSCALLS.get()
      var offset = offset_low
      FS.llseek(stream, offset, whence)
      HEAP32[result >> 2] = stream.position
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall145(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        iov = SYSCALLS.get(),
        iovcnt = SYSCALLS.get()
      return SYSCALLS.doReadv(stream, iov, iovcnt)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall146(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        iov = SYSCALLS.get(),
        iovcnt = SYSCALLS.get()
      return SYSCALLS.doWritev(stream, iov, iovcnt)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall183(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var buf = SYSCALLS.get(),
        size = SYSCALLS.get()
      if (size === 0) return -ERRNO_CODES.EINVAL
      var cwd = FS.cwd()
      var cwdLengthInBytes = lengthBytesUTF8(cwd)
      if (size < cwdLengthInBytes + 1) return -ERRNO_CODES.ERANGE
      stringToUTF8(cwd, buf, size)
      return buf
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall198(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var path = SYSCALLS.getStr(),
        owner = SYSCALLS.get(),
        group = SYSCALLS.get()
      FS.chown(path, owner, group)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  var PROCINFO = { ppid: 1, pid: 42, sid: 42, pgid: 42 }
  function ___syscall20(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      return PROCINFO.pid
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall6(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var stream = SYSCALLS.getStreamFromFD()
      FS.close(stream)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall60(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var mask = SYSCALLS.get()
      var old = SYSCALLS.umask
      SYSCALLS.umask = mask
      return old
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall83(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var target = SYSCALLS.getStr(),
        linkpath = SYSCALLS.getStr()
      FS.symlink(target, linkpath)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___syscall91(which, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var addr = SYSCALLS.get(),
        len = SYSCALLS.get()
      var info = SYSCALLS.mappings[addr]
      if (!info) return 0
      if (len === info.len) {
        var stream = FS.getStream(info.fd)
        SYSCALLS.doMsync(addr, stream, len, info.flags)
        FS.munmap(stream)
        SYSCALLS.mappings[addr] = null
        if (info.allocated) {
          _free(info.malloc)
        }
      }
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  function ___unlock() {}
  var structRegistrations = {}
  function runDestructors(destructors) {
    while (destructors.length) {
      var ptr = destructors.pop()
      var del = destructors.pop()
      del(ptr)
    }
  }
  function simpleReadValueFromPointer(pointer) {
    return this['fromWireType'](HEAPU32[pointer >> 2])
  }
  var awaitingDependencies = {}
  var registeredTypes = {}
  var typeDependencies = {}
  var char_0 = 48
  var char_9 = 57
  function makeLegalFunctionName(name) {
    if (undefined === name) {
      return '_unknown'
    }
    name = name.replace(/[^a-zA-Z0-9_]/g, '$')
    var f = name.charCodeAt(0)
    if (f >= char_0 && f <= char_9) {
      return '_' + name
    } else {
      return name
    }
  }
  function createNamedFunction(name, body) {
    name = makeLegalFunctionName(name)
    return new Function(
      'body',
      'return function ' + name + '() {\n' + '    "use strict";' + '    return body.apply(this, arguments);\n' + '};\n'
    )(body)
  }
  function extendError(baseErrorType, errorName) {
    var errorClass = createNamedFunction(errorName, function (message) {
      this.name = errorName
      this.message = message
      var stack = new Error(message).stack
      if (stack !== undefined) {
        this.stack = this.toString() + '\n' + stack.replace(/^Error(:[^\n]*)?\n/, '')
      }
    })
    errorClass.prototype = Object.create(baseErrorType.prototype)
    errorClass.prototype.constructor = errorClass
    errorClass.prototype.toString = function () {
      if (this.message === undefined) {
        return this.name
      } else {
        return this.name + ': ' + this.message
      }
    }
    return errorClass
  }
  var InternalError = undefined
  function throwInternalError(message) {
    throw new InternalError(message)
  }
  function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
    myTypes.forEach(function (type) {
      typeDependencies[type] = dependentTypes
    })
    function onComplete(typeConverters) {
      var myTypeConverters = getTypeConverters(typeConverters)
      if (myTypeConverters.length !== myTypes.length) {
        throwInternalError('Mismatched type converter count')
      }
      for (var i = 0; i < myTypes.length; ++i) {
        registerType(myTypes[i], myTypeConverters[i])
      }
    }
    var typeConverters = new Array(dependentTypes.length)
    var unregisteredTypes = []
    var registered = 0
    dependentTypes.forEach(function (dt, i) {
      if (registeredTypes.hasOwnProperty(dt)) {
        typeConverters[i] = registeredTypes[dt]
      } else {
        unregisteredTypes.push(dt)
        if (!awaitingDependencies.hasOwnProperty(dt)) {
          awaitingDependencies[dt] = []
        }
        awaitingDependencies[dt].push(function () {
          typeConverters[i] = registeredTypes[dt]
          ++registered
          if (registered === unregisteredTypes.length) {
            onComplete(typeConverters)
          }
        })
      }
    })
    if (0 === unregisteredTypes.length) {
      onComplete(typeConverters)
    }
  }
  function __embind_finalize_value_object(structType) {
    var reg = structRegistrations[structType]
    delete structRegistrations[structType]
    var rawConstructor = reg.rawConstructor
    var rawDestructor = reg.rawDestructor
    var fieldRecords = reg.fields
    var fieldTypes = fieldRecords
      .map(function (field) {
        return field.getterReturnType
      })
      .concat(
        fieldRecords.map(function (field) {
          return field.setterArgumentType
        })
      )
    whenDependentTypesAreResolved([structType], fieldTypes, function (fieldTypes) {
      var fields = {}
      fieldRecords.forEach(function (field, i) {
        var fieldName = field.fieldName
        var getterReturnType = fieldTypes[i]
        var getter = field.getter
        var getterContext = field.getterContext
        var setterArgumentType = fieldTypes[i + fieldRecords.length]
        var setter = field.setter
        var setterContext = field.setterContext
        fields[fieldName] = {
          read: function (ptr) {
            return getterReturnType['fromWireType'](getter(getterContext, ptr))
          },
          write: function (ptr, o) {
            var destructors = []
            setter(setterContext, ptr, setterArgumentType['toWireType'](destructors, o))
            runDestructors(destructors)
          },
        }
      })
      return [
        {
          name: reg.name,
          fromWireType: function (ptr) {
            var rv = {}
            for (var i in fields) {
              rv[i] = fields[i].read(ptr)
            }
            rawDestructor(ptr)
            return rv
          },
          toWireType: function (destructors, o) {
            for (var fieldName in fields) {
              if (!(fieldName in o)) {
                throw new TypeError('Missing field')
              }
            }
            var ptr = rawConstructor()
            for (fieldName in fields) {
              fields[fieldName].write(ptr, o[fieldName])
            }
            if (destructors !== null) {
              destructors.push(rawDestructor, ptr)
            }
            return ptr
          },
          argPackAdvance: 8,
          readValueFromPointer: simpleReadValueFromPointer,
          destructorFunction: rawDestructor,
        },
      ]
    })
  }
  function getShiftFromSize(size) {
    switch (size) {
      case 1:
        return 0
      case 2:
        return 1
      case 4:
        return 2
      case 8:
        return 3
      default:
        throw new TypeError('Unknown type size: ' + size)
    }
  }
  function embind_init_charCodes() {
    var codes = new Array(256)
    for (var i = 0; i < 256; ++i) {
      codes[i] = String.fromCharCode(i)
    }
    embind_charCodes = codes
  }
  var embind_charCodes = undefined
  function readLatin1String(ptr) {
    var ret = ''
    var c = ptr
    while (HEAPU8[c]) {
      ret += embind_charCodes[HEAPU8[c++]]
    }
    return ret
  }
  var BindingError = undefined
  function throwBindingError(message) {
    throw new BindingError(message)
  }
  function registerType(rawType, registeredInstance, options) {
    options = options || {}
    if (!('argPackAdvance' in registeredInstance)) {
      throw new TypeError('registerType registeredInstance requires argPackAdvance')
    }
    var name = registeredInstance.name
    if (!rawType) {
      throwBindingError('type "' + name + '" must have a positive integer typeid pointer')
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
      if (options.ignoreDuplicateRegistrations) {
        return
      } else {
        throwBindingError("Cannot register type '" + name + "' twice")
      }
    }
    registeredTypes[rawType] = registeredInstance
    delete typeDependencies[rawType]
    if (awaitingDependencies.hasOwnProperty(rawType)) {
      var callbacks = awaitingDependencies[rawType]
      delete awaitingDependencies[rawType]
      callbacks.forEach(function (cb) {
        cb()
      })
    }
  }
  function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
    var shift = getShiftFromSize(size)
    name = readLatin1String(name)
    registerType(rawType, {
      name: name,
      fromWireType: function (wt) {
        return !!wt
      },
      toWireType: function (destructors, o) {
        return o ? trueValue : falseValue
      },
      argPackAdvance: 8,
      readValueFromPointer: function (pointer) {
        var heap
        if (size === 1) {
          heap = HEAP8
        } else if (size === 2) {
          heap = HEAP16
        } else if (size === 4) {
          heap = HEAP32
        } else {
          throw new TypeError('Unknown boolean type size: ' + name)
        }
        return this['fromWireType'](heap[pointer >> shift])
      },
      destructorFunction: null,
    })
  }
  function ClassHandle_isAliasOf(other) {
    if (!(this instanceof ClassHandle)) {
      return false
    }
    if (!(other instanceof ClassHandle)) {
      return false
    }
    var leftClass = this.$$.ptrType.registeredClass
    var left = this.$$.ptr
    var rightClass = other.$$.ptrType.registeredClass
    var right = other.$$.ptr
    while (leftClass.baseClass) {
      left = leftClass.upcast(left)
      leftClass = leftClass.baseClass
    }
    while (rightClass.baseClass) {
      right = rightClass.upcast(right)
      rightClass = rightClass.baseClass
    }
    return leftClass === rightClass && left === right
  }
  function shallowCopyInternalPointer(o) {
    return {
      count: o.count,
      deleteScheduled: o.deleteScheduled,
      preservePointerOnDelete: o.preservePointerOnDelete,
      ptr: o.ptr,
      ptrType: o.ptrType,
      smartPtr: o.smartPtr,
      smartPtrType: o.smartPtrType,
    }
  }
  function throwInstanceAlreadyDeleted(obj) {
    function getInstanceTypeName(handle) {
      return handle.$$.ptrType.registeredClass.name
    }
    throwBindingError(getInstanceTypeName(obj) + ' instance already deleted')
  }
  function ClassHandle_clone() {
    if (!this.$$.ptr) {
      throwInstanceAlreadyDeleted(this)
    }
    if (this.$$.preservePointerOnDelete) {
      this.$$.count.value += 1
      return this
    } else {
      var clone = Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } })
      clone.$$.count.value += 1
      clone.$$.deleteScheduled = false
      return clone
    }
  }
  function runDestructor(handle) {
    var $$ = handle.$$
    if ($$.smartPtr) {
      $$.smartPtrType.rawDestructor($$.smartPtr)
    } else {
      $$.ptrType.registeredClass.rawDestructor($$.ptr)
    }
  }
  function ClassHandle_delete() {
    if (!this.$$.ptr) {
      throwInstanceAlreadyDeleted(this)
    }
    if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
      throwBindingError('Object already scheduled for deletion')
    }
    this.$$.count.value -= 1
    var toDelete = 0 === this.$$.count.value
    if (toDelete) {
      runDestructor(this)
    }
    if (!this.$$.preservePointerOnDelete) {
      this.$$.smartPtr = undefined
      this.$$.ptr = undefined
    }
  }
  function ClassHandle_isDeleted() {
    return !this.$$.ptr
  }
  var delayFunction = undefined
  var deletionQueue = []
  function flushPendingDeletes() {
    while (deletionQueue.length) {
      var obj = deletionQueue.pop()
      obj.$$.deleteScheduled = false
      obj['delete']()
    }
  }
  function ClassHandle_deleteLater() {
    if (!this.$$.ptr) {
      throwInstanceAlreadyDeleted(this)
    }
    if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
      throwBindingError('Object already scheduled for deletion')
    }
    deletionQueue.push(this)
    if (deletionQueue.length === 1 && delayFunction) {
      delayFunction(flushPendingDeletes)
    }
    this.$$.deleteScheduled = true
    return this
  }
  function init_ClassHandle() {
    ClassHandle.prototype['isAliasOf'] = ClassHandle_isAliasOf
    ClassHandle.prototype['clone'] = ClassHandle_clone
    ClassHandle.prototype['delete'] = ClassHandle_delete
    ClassHandle.prototype['isDeleted'] = ClassHandle_isDeleted
    ClassHandle.prototype['deleteLater'] = ClassHandle_deleteLater
  }
  function ClassHandle() {}
  var registeredPointers = {}
  function ensureOverloadTable(proto, methodName, humanName) {
    if (undefined === proto[methodName].overloadTable) {
      var prevFunc = proto[methodName]
      proto[methodName] = function () {
        if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
          throwBindingError(
            "Function '" +
              humanName +
              "' called with an invalid number of arguments (" +
              arguments.length +
              ') - expects one of (' +
              proto[methodName].overloadTable +
              ')!'
          )
        }
        return proto[methodName].overloadTable[arguments.length].apply(this, arguments)
      }
      proto[methodName].overloadTable = []
      proto[methodName].overloadTable[prevFunc.argCount] = prevFunc
    }
  }
  function exposePublicSymbol(name, value, numArguments) {
    if (Module.hasOwnProperty(name)) {
      if (
        undefined === numArguments ||
        (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])
      ) {
        throwBindingError("Cannot register public name '" + name + "' twice")
      }
      ensureOverloadTable(Module, name, name)
      if (Module.hasOwnProperty(numArguments)) {
        throwBindingError(
          'Cannot register multiple overloads of a function with the same number of arguments (' + numArguments + ')!'
        )
      }
      Module[name].overloadTable[numArguments] = value
    } else {
      Module[name] = value
      if (undefined !== numArguments) {
        Module[name].numArguments = numArguments
      }
    }
  }
  function RegisteredClass(
    name,
    constructor,
    instancePrototype,
    rawDestructor,
    baseClass,
    getActualType,
    upcast,
    downcast
  ) {
    this.name = name
    this.constructor = constructor
    this.instancePrototype = instancePrototype
    this.rawDestructor = rawDestructor
    this.baseClass = baseClass
    this.getActualType = getActualType
    this.upcast = upcast
    this.downcast = downcast
    this.pureVirtualFunctions = []
  }
  function upcastPointer(ptr, ptrClass, desiredClass) {
    while (ptrClass !== desiredClass) {
      if (!ptrClass.upcast) {
        throwBindingError('Expected null or instance of ' + desiredClass.name + ', got an instance of ' + ptrClass.name)
      }
      ptr = ptrClass.upcast(ptr)
      ptrClass = ptrClass.baseClass
    }
    return ptr
  }
  function constNoSmartPtrRawPointerToWireType(destructors, handle) {
    if (handle === null) {
      if (this.isReference) {
        throwBindingError('null is not a valid ' + this.name)
      }
      return 0
    }
    if (!handle.$$) {
      throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name)
    }
    if (!handle.$$.ptr) {
      throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name)
    }
    var handleClass = handle.$$.ptrType.registeredClass
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass)
    return ptr
  }
  function genericPointerToWireType(destructors, handle) {
    var ptr
    if (handle === null) {
      if (this.isReference) {
        throwBindingError('null is not a valid ' + this.name)
      }
      if (this.isSmartPointer) {
        ptr = this.rawConstructor()
        if (destructors !== null) {
          destructors.push(this.rawDestructor, ptr)
        }
        return ptr
      } else {
        return 0
      }
    }
    if (!handle.$$) {
      throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name)
    }
    if (!handle.$$.ptr) {
      throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name)
    }
    if (!this.isConst && handle.$$.ptrType.isConst) {
      throwBindingError(
        'Cannot convert argument of type ' +
          (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) +
          ' to parameter type ' +
          this.name
      )
    }
    var handleClass = handle.$$.ptrType.registeredClass
    ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass)
    if (this.isSmartPointer) {
      if (undefined === handle.$$.smartPtr) {
        throwBindingError('Passing raw pointer to smart pointer is illegal')
      }
      switch (this.sharingPolicy) {
        case 0:
          if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr
          } else {
            throwBindingError(
              'Cannot convert argument of type ' +
                (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) +
                ' to parameter type ' +
                this.name
            )
          }
          break
        case 1:
          ptr = handle.$$.smartPtr
          break
        case 2:
          if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr
          } else {
            var clonedHandle = handle['clone']()
            ptr = this.rawShare(
              ptr,
              __emval_register(function () {
                clonedHandle['delete']()
              })
            )
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr)
            }
          }
          break
        default:
          throwBindingError('Unsupporting sharing policy')
      }
    }
    return ptr
  }
  function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
    if (handle === null) {
      if (this.isReference) {
        throwBindingError('null is not a valid ' + this.name)
      }
      return 0
    }
    if (!handle.$$) {
      throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name)
    }
    if (!handle.$$.ptr) {
      throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name)
    }
    if (handle.$$.ptrType.isConst) {
      throwBindingError('Cannot convert argument of type ' + handle.$$.ptrType.name + ' to parameter type ' + this.name)
    }
    var handleClass = handle.$$.ptrType.registeredClass
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass)
    return ptr
  }
  function RegisteredPointer_getPointee(ptr) {
    if (this.rawGetPointee) {
      ptr = this.rawGetPointee(ptr)
    }
    return ptr
  }
  function RegisteredPointer_destructor(ptr) {
    if (this.rawDestructor) {
      this.rawDestructor(ptr)
    }
  }
  function RegisteredPointer_deleteObject(handle) {
    if (handle !== null) {
      handle['delete']()
    }
  }
  function downcastPointer(ptr, ptrClass, desiredClass) {
    if (ptrClass === desiredClass) {
      return ptr
    }
    if (undefined === desiredClass.baseClass) {
      return null
    }
    var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass)
    if (rv === null) {
      return null
    }
    return desiredClass.downcast(rv)
  }
  function getInheritedInstanceCount() {
    return Object.keys(registeredInstances).length
  }
  function getLiveInheritedInstances() {
    var rv = []
    for (var k in registeredInstances) {
      if (registeredInstances.hasOwnProperty(k)) {
        rv.push(registeredInstances[k])
      }
    }
    return rv
  }
  function setDelayFunction(fn) {
    delayFunction = fn
    if (deletionQueue.length && delayFunction) {
      delayFunction(flushPendingDeletes)
    }
  }
  function init_embind() {
    Module['getInheritedInstanceCount'] = getInheritedInstanceCount
    Module['getLiveInheritedInstances'] = getLiveInheritedInstances
    Module['flushPendingDeletes'] = flushPendingDeletes
    Module['setDelayFunction'] = setDelayFunction
  }
  var registeredInstances = {}
  function getBasestPointer(class_, ptr) {
    if (ptr === undefined) {
      throwBindingError('ptr should not be undefined')
    }
    while (class_.baseClass) {
      ptr = class_.upcast(ptr)
      class_ = class_.baseClass
    }
    return ptr
  }
  function getInheritedInstance(class_, ptr) {
    ptr = getBasestPointer(class_, ptr)
    return registeredInstances[ptr]
  }
  function makeClassHandle(prototype, record) {
    if (!record.ptrType || !record.ptr) {
      throwInternalError('makeClassHandle requires ptr and ptrType')
    }
    var hasSmartPtrType = !!record.smartPtrType
    var hasSmartPtr = !!record.smartPtr
    if (hasSmartPtrType !== hasSmartPtr) {
      throwInternalError('Both smartPtrType and smartPtr must be specified')
    }
    record.count = { value: 1 }
    return Object.create(prototype, { $$: { value: record } })
  }
  function RegisteredPointer_fromWireType(ptr) {
    var rawPointer = this.getPointee(ptr)
    if (!rawPointer) {
      this.destructor(ptr)
      return null
    }
    var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer)
    if (undefined !== registeredInstance) {
      if (0 === registeredInstance.$$.count.value) {
        registeredInstance.$$.ptr = rawPointer
        registeredInstance.$$.smartPtr = ptr
        return registeredInstance['clone']()
      } else {
        var rv = registeredInstance['clone']()
        this.destructor(ptr)
        return rv
      }
    }
    function makeDefaultHandle() {
      if (this.isSmartPointer) {
        return makeClassHandle(this.registeredClass.instancePrototype, {
          ptrType: this.pointeeType,
          ptr: rawPointer,
          smartPtrType: this,
          smartPtr: ptr,
        })
      } else {
        return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr: ptr })
      }
    }
    var actualType = this.registeredClass.getActualType(rawPointer)
    var registeredPointerRecord = registeredPointers[actualType]
    if (!registeredPointerRecord) {
      return makeDefaultHandle.call(this)
    }
    var toType
    if (this.isConst) {
      toType = registeredPointerRecord.constPointerType
    } else {
      toType = registeredPointerRecord.pointerType
    }
    var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass)
    if (dp === null) {
      return makeDefaultHandle.call(this)
    }
    if (this.isSmartPointer) {
      return makeClassHandle(toType.registeredClass.instancePrototype, {
        ptrType: toType,
        ptr: dp,
        smartPtrType: this,
        smartPtr: ptr,
      })
    } else {
      return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp })
    }
  }
  function init_RegisteredPointer() {
    RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee
    RegisteredPointer.prototype.destructor = RegisteredPointer_destructor
    RegisteredPointer.prototype['argPackAdvance'] = 8
    RegisteredPointer.prototype['readValueFromPointer'] = simpleReadValueFromPointer
    RegisteredPointer.prototype['deleteObject'] = RegisteredPointer_deleteObject
    RegisteredPointer.prototype['fromWireType'] = RegisteredPointer_fromWireType
  }
  function RegisteredPointer(
    name,
    registeredClass,
    isReference,
    isConst,
    isSmartPointer,
    pointeeType,
    sharingPolicy,
    rawGetPointee,
    rawConstructor,
    rawShare,
    rawDestructor
  ) {
    this.name = name
    this.registeredClass = registeredClass
    this.isReference = isReference
    this.isConst = isConst
    this.isSmartPointer = isSmartPointer
    this.pointeeType = pointeeType
    this.sharingPolicy = sharingPolicy
    this.rawGetPointee = rawGetPointee
    this.rawConstructor = rawConstructor
    this.rawShare = rawShare
    this.rawDestructor = rawDestructor
    if (!isSmartPointer && registeredClass.baseClass === undefined) {
      if (isConst) {
        this['toWireType'] = constNoSmartPtrRawPointerToWireType
        this.destructorFunction = null
      } else {
        this['toWireType'] = nonConstNoSmartPtrRawPointerToWireType
        this.destructorFunction = null
      }
    } else {
      this['toWireType'] = genericPointerToWireType
    }
  }
  function replacePublicSymbol(name, value, numArguments) {
    if (!Module.hasOwnProperty(name)) {
      throwInternalError('Replacing nonexistant public symbol')
    }
    if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
      Module[name].overloadTable[numArguments] = value
    } else {
      Module[name] = value
      Module[name].argCount = numArguments
    }
  }
  function embind__requireFunction(signature, rawFunction) {
    signature = readLatin1String(signature)
    function makeDynCaller(dynCall) {
      var args = []
      for (var i = 1; i < signature.length; ++i) {
        args.push('a' + i)
      }
      var name = 'dynCall_' + signature + '_' + rawFunction
      var body = 'return function ' + name + '(' + args.join(', ') + ') {\n'
      body += '    return dynCall(rawFunction' + (args.length ? ', ' : '') + args.join(', ') + ');\n'
      body += '};\n'
      return new Function('dynCall', 'rawFunction', body)(dynCall, rawFunction)
    }
    var fp
    if (Module['FUNCTION_TABLE_' + signature] !== undefined) {
      fp = Module['FUNCTION_TABLE_' + signature][rawFunction]
    } else if (typeof FUNCTION_TABLE !== 'undefined') {
      fp = FUNCTION_TABLE[rawFunction]
    } else {
      var dc = Module['asm']['dynCall_' + signature]
      if (dc === undefined) {
        dc = Module['asm']['dynCall_' + signature.replace(/f/g, 'd')]
        if (dc === undefined) {
          throwBindingError('No dynCall invoker for signature: ' + signature)
        }
      }
      fp = makeDynCaller(dc)
    }
    if (typeof fp !== 'function') {
      throwBindingError('unknown function pointer with signature ' + signature + ': ' + rawFunction)
    }
    return fp
  }
  var UnboundTypeError = undefined
  function getTypeName(type) {
    var ptr = ___getTypeName(type)
    var rv = readLatin1String(ptr)
    _free(ptr)
    return rv
  }
  function throwUnboundTypeError(message, types) {
    var unboundTypes = []
    var seen = {}
    function visit(type) {
      if (seen[type]) {
        return
      }
      if (registeredTypes[type]) {
        return
      }
      if (typeDependencies[type]) {
        typeDependencies[type].forEach(visit)
        return
      }
      unboundTypes.push(type)
      seen[type] = true
    }
    types.forEach(visit)
    throw new UnboundTypeError(message + ': ' + unboundTypes.map(getTypeName).join([', ']))
  }
  function __embind_register_class(
    rawType,
    rawPointerType,
    rawConstPointerType,
    baseClassRawType,
    getActualTypeSignature,
    getActualType,
    upcastSignature,
    upcast,
    downcastSignature,
    downcast,
    name,
    destructorSignature,
    rawDestructor
  ) {
    name = readLatin1String(name)
    getActualType = embind__requireFunction(getActualTypeSignature, getActualType)
    if (upcast) {
      upcast = embind__requireFunction(upcastSignature, upcast)
    }
    if (downcast) {
      downcast = embind__requireFunction(downcastSignature, downcast)
    }
    rawDestructor = embind__requireFunction(destructorSignature, rawDestructor)
    var legalFunctionName = makeLegalFunctionName(name)
    exposePublicSymbol(legalFunctionName, function () {
      throwUnboundTypeError('Cannot construct ' + name + ' due to unbound types', [baseClassRawType])
    })
    whenDependentTypesAreResolved(
      [rawType, rawPointerType, rawConstPointerType],
      baseClassRawType ? [baseClassRawType] : [],
      function (base) {
        base = base[0]
        var baseClass
        var basePrototype
        if (baseClassRawType) {
          baseClass = base.registeredClass
          basePrototype = baseClass.instancePrototype
        } else {
          basePrototype = ClassHandle.prototype
        }
        var constructor = createNamedFunction(legalFunctionName, function () {
          if (Object.getPrototypeOf(this) !== instancePrototype) {
            throw new BindingError("Use 'new' to construct " + name)
          }
          if (undefined === registeredClass.constructor_body) {
            throw new BindingError(name + ' has no accessible constructor')
          }
          var body = registeredClass.constructor_body[arguments.length]
          if (undefined === body) {
            throw new BindingError(
              'Tried to invoke ctor of ' +
                name +
                ' with invalid number of parameters (' +
                arguments.length +
                ') - expected (' +
                Object.keys(registeredClass.constructor_body).toString() +
                ') parameters instead!'
            )
          }
          return body.apply(this, arguments)
        })
        var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } })
        constructor.prototype = instancePrototype
        var registeredClass = new RegisteredClass(
          name,
          constructor,
          instancePrototype,
          rawDestructor,
          baseClass,
          getActualType,
          upcast,
          downcast
        )
        var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false)
        var pointerConverter = new RegisteredPointer(name + '*', registeredClass, false, false, false)
        var constPointerConverter = new RegisteredPointer(name + ' const*', registeredClass, false, true, false)
        registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter }
        replacePublicSymbol(legalFunctionName, constructor)
        return [referenceConverter, pointerConverter, constPointerConverter]
      }
    )
  }
  function heap32VectorToArray(count, firstElement) {
    var array = []
    for (var i = 0; i < count; i++) {
      array.push(HEAP32[(firstElement >> 2) + i])
    }
    return array
  }
  function __embind_register_class_constructor(
    rawClassType,
    argCount,
    rawArgTypesAddr,
    invokerSignature,
    invoker,
    rawConstructor
  ) {
    var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr)
    invoker = embind__requireFunction(invokerSignature, invoker)
    whenDependentTypesAreResolved([], [rawClassType], function (classType) {
      classType = classType[0]
      var humanName = 'constructor ' + classType.name
      if (undefined === classType.registeredClass.constructor_body) {
        classType.registeredClass.constructor_body = []
      }
      if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
        throw new BindingError(
          'Cannot register multiple constructors with identical number of parameters (' +
            (argCount - 1) +
            ") for class '" +
            classType.name +
            "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
        )
      }
      classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
        throwUnboundTypeError('Cannot construct ' + classType.name + ' due to unbound types', rawArgTypes)
      }
      whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
        classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
          if (arguments.length !== argCount - 1) {
            throwBindingError(humanName + ' called with ' + arguments.length + ' arguments, expected ' + (argCount - 1))
          }
          var destructors = []
          var args = new Array(argCount)
          args[0] = rawConstructor
          for (var i = 1; i < argCount; ++i) {
            args[i] = argTypes[i]['toWireType'](destructors, arguments[i - 1])
          }
          var ptr = invoker.apply(null, args)
          runDestructors(destructors)
          return argTypes[0]['fromWireType'](ptr)
        }
        return []
      })
      return []
    })
  }
  function new_(constructor, argumentList) {
    if (!(constructor instanceof Function)) {
      throw new TypeError('new_ called with constructor type ' + typeof constructor + ' which is not a function')
    }
    var dummy = createNamedFunction(constructor.name || 'unknownFunctionName', function () {})
    dummy.prototype = constructor.prototype
    var obj = new dummy()
    var r = constructor.apply(obj, argumentList)
    return r instanceof Object ? r : obj
  }
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
    var argCount = argTypes.length
    if (argCount < 2) {
      throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")
    }
    var isClassMethodFunc = argTypes[1] !== null && classType !== null
    var needsDestructorStack = false
    for (var i = 1; i < argTypes.length; ++i) {
      if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
        needsDestructorStack = true
        break
      }
    }
    var returns = argTypes[0].name !== 'void'
    var argsList = ''
    var argsListWired = ''
    for (var i = 0; i < argCount - 2; ++i) {
      argsList += (i !== 0 ? ', ' : '') + 'arg' + i
      argsListWired += (i !== 0 ? ', ' : '') + 'arg' + i + 'Wired'
    }
    var invokerFnBody =
      'return function ' +
      makeLegalFunctionName(humanName) +
      '(' +
      argsList +
      ') {\n' +
      'if (arguments.length !== ' +
      (argCount - 2) +
      ') {\n' +
      "throwBindingError('function " +
      humanName +
      " called with ' + arguments.length + ' arguments, expected " +
      (argCount - 2) +
      " args!');\n" +
      '}\n'
    if (needsDestructorStack) {
      invokerFnBody += 'var destructors = [];\n'
    }
    var dtorStack = needsDestructorStack ? 'destructors' : 'null'
    var args1 = ['throwBindingError', 'invoker', 'fn', 'runDestructors', 'retType', 'classParam']
    var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]]
    if (isClassMethodFunc) {
      invokerFnBody += 'var thisWired = classParam.toWireType(' + dtorStack + ', this);\n'
    }
    for (var i = 0; i < argCount - 2; ++i) {
      invokerFnBody +=
        'var arg' +
        i +
        'Wired = argType' +
        i +
        '.toWireType(' +
        dtorStack +
        ', arg' +
        i +
        '); // ' +
        argTypes[i + 2].name +
        '\n'
      args1.push('argType' + i)
      args2.push(argTypes[i + 2])
    }
    if (isClassMethodFunc) {
      argsListWired = 'thisWired' + (argsListWired.length > 0 ? ', ' : '') + argsListWired
    }
    invokerFnBody +=
      (returns ? 'var rv = ' : '') + 'invoker(fn' + (argsListWired.length > 0 ? ', ' : '') + argsListWired + ');\n'
    if (needsDestructorStack) {
      invokerFnBody += 'runDestructors(destructors);\n'
    } else {
      for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
        var paramName = i === 1 ? 'thisWired' : 'arg' + (i - 2) + 'Wired'
        if (argTypes[i].destructorFunction !== null) {
          invokerFnBody += paramName + '_dtor(' + paramName + '); // ' + argTypes[i].name + '\n'
          args1.push(paramName + '_dtor')
          args2.push(argTypes[i].destructorFunction)
        }
      }
    }
    if (returns) {
      invokerFnBody += 'var ret = retType.fromWireType(rv);\n' + 'return ret;\n'
    } else {
    }
    invokerFnBody += '}\n'
    args1.push(invokerFnBody)
    var invokerFunction = new_(Function, args1).apply(null, args2)
    return invokerFunction
  }
  function __embind_register_class_function(
    rawClassType,
    methodName,
    argCount,
    rawArgTypesAddr,
    invokerSignature,
    rawInvoker,
    context,
    isPureVirtual
  ) {
    var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr)
    methodName = readLatin1String(methodName)
    rawInvoker = embind__requireFunction(invokerSignature, rawInvoker)
    whenDependentTypesAreResolved([], [rawClassType], function (classType) {
      classType = classType[0]
      var humanName = classType.name + '.' + methodName
      if (isPureVirtual) {
        classType.registeredClass.pureVirtualFunctions.push(methodName)
      }
      function unboundTypesHandler() {
        throwUnboundTypeError('Cannot call ' + humanName + ' due to unbound types', rawArgTypes)
      }
      var proto = classType.registeredClass.instancePrototype
      var method = proto[methodName]
      if (
        undefined === method ||
        (undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2)
      ) {
        unboundTypesHandler.argCount = argCount - 2
        unboundTypesHandler.className = classType.name
        proto[methodName] = unboundTypesHandler
      } else {
        ensureOverloadTable(proto, methodName, humanName)
        proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler
      }
      whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
        var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context)
        if (undefined === proto[methodName].overloadTable) {
          memberFunction.argCount = argCount - 2
          proto[methodName] = memberFunction
        } else {
          proto[methodName].overloadTable[argCount - 2] = memberFunction
        }
        return []
      })
      return []
    })
  }
  var emval_free_list = []
  var emval_handle_array = [{}, { value: undefined }, { value: null }, { value: true }, { value: false }]
  function __emval_decref(handle) {
    if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
      emval_handle_array[handle] = undefined
      emval_free_list.push(handle)
    }
  }
  function count_emval_handles() {
    var count = 0
    for (var i = 5; i < emval_handle_array.length; ++i) {
      if (emval_handle_array[i] !== undefined) {
        ++count
      }
    }
    return count
  }
  function get_first_emval() {
    for (var i = 5; i < emval_handle_array.length; ++i) {
      if (emval_handle_array[i] !== undefined) {
        return emval_handle_array[i]
      }
    }
    return null
  }
  function init_emval() {
    Module['count_emval_handles'] = count_emval_handles
    Module['get_first_emval'] = get_first_emval
  }
  function __emval_register(value) {
    switch (value) {
      case undefined: {
        return 1
      }
      case null: {
        return 2
      }
      case true: {
        return 3
      }
      case false: {
        return 4
      }
      default: {
        var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length
        emval_handle_array[handle] = { refcount: 1, value: value }
        return handle
      }
    }
  }
  function __embind_register_emval(rawType, name) {
    name = readLatin1String(name)
    registerType(rawType, {
      name: name,
      fromWireType: function (handle) {
        var rv = emval_handle_array[handle].value
        __emval_decref(handle)
        return rv
      },
      toWireType: function (destructors, value) {
        return __emval_register(value)
      },
      argPackAdvance: 8,
      readValueFromPointer: simpleReadValueFromPointer,
      destructorFunction: null,
    })
  }
  function _embind_repr(v) {
    if (v === null) {
      return 'null'
    }
    var t = typeof v
    if (t === 'object' || t === 'array' || t === 'function') {
      return v.toString()
    } else {
      return '' + v
    }
  }
  function floatReadValueFromPointer(name, shift) {
    switch (shift) {
      case 2:
        return function (pointer) {
          return this['fromWireType'](HEAPF32[pointer >> 2])
        }
      case 3:
        return function (pointer) {
          return this['fromWireType'](HEAPF64[pointer >> 3])
        }
      default:
        throw new TypeError('Unknown float type: ' + name)
    }
  }
  function __embind_register_float(rawType, name, size) {
    var shift = getShiftFromSize(size)
    name = readLatin1String(name)
    registerType(rawType, {
      name: name,
      fromWireType: function (value) {
        return value
      },
      toWireType: function (destructors, value) {
        if (typeof value !== 'number' && typeof value !== 'boolean') {
          throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name)
        }
        return value
      },
      argPackAdvance: 8,
      readValueFromPointer: floatReadValueFromPointer(name, shift),
      destructorFunction: null,
    })
  }
  function integerReadValueFromPointer(name, shift, signed) {
    switch (shift) {
      case 0:
        return signed
          ? function readS8FromPointer(pointer) {
              return HEAP8[pointer]
            }
          : function readU8FromPointer(pointer) {
              return HEAPU8[pointer]
            }
      case 1:
        return signed
          ? function readS16FromPointer(pointer) {
              return HEAP16[pointer >> 1]
            }
          : function readU16FromPointer(pointer) {
              return HEAPU16[pointer >> 1]
            }
      case 2:
        return signed
          ? function readS32FromPointer(pointer) {
              return HEAP32[pointer >> 2]
            }
          : function readU32FromPointer(pointer) {
              return HEAPU32[pointer >> 2]
            }
      default:
        throw new TypeError('Unknown integer type: ' + name)
    }
  }
  function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
    name = readLatin1String(name)
    if (maxRange === -1) {
      maxRange = 4294967295
    }
    var shift = getShiftFromSize(size)
    var fromWireType = function (value) {
      return value
    }
    if (minRange === 0) {
      var bitshift = 32 - 8 * size
      fromWireType = function (value) {
        return (value << bitshift) >>> bitshift
      }
    }
    var isUnsignedType = name.indexOf('unsigned') != -1
    registerType(primitiveType, {
      name: name,
      fromWireType: fromWireType,
      toWireType: function (destructors, value) {
        if (typeof value !== 'number' && typeof value !== 'boolean') {
          throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name)
        }
        if (value < minRange || value > maxRange) {
          throw new TypeError(
            'Passing a number "' +
              _embind_repr(value) +
              '" from JS side to C/C++ side to an argument of type "' +
              name +
              '", which is outside the valid range [' +
              minRange +
              ', ' +
              maxRange +
              ']!'
          )
        }
        return isUnsignedType ? value >>> 0 : value | 0
      },
      argPackAdvance: 8,
      readValueFromPointer: integerReadValueFromPointer(name, shift, minRange !== 0),
      destructorFunction: null,
    })
  }
  function __embind_register_memory_view(rawType, dataTypeIndex, name) {
    var typeMapping = [
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
    ]
    var TA = typeMapping[dataTypeIndex]
    function decodeMemoryView(handle) {
      handle = handle >> 2
      var heap = HEAPU32
      var size = heap[handle]
      var data = heap[handle + 1]
      return new TA(heap['buffer'], data, size)
    }
    name = readLatin1String(name)
    registerType(
      rawType,
      { name: name, fromWireType: decodeMemoryView, argPackAdvance: 8, readValueFromPointer: decodeMemoryView },
      { ignoreDuplicateRegistrations: true }
    )
  }
  function __embind_register_std_string(rawType, name) {
    name = readLatin1String(name)
    registerType(rawType, {
      name: name,
      fromWireType: function (value) {
        var length = HEAPU32[value >> 2]
        var a = new Array(length)
        for (var i = 0; i < length; ++i) {
          a[i] = String.fromCharCode(HEAPU8[value + 4 + i])
        }
        _free(value)
        return a.join('')
      },
      toWireType: function (destructors, value) {
        if (value instanceof ArrayBuffer) {
          value = new Uint8Array(value)
        }
        function getTAElement(ta, index) {
          return ta[index]
        }
        function getStringElement(string, index) {
          return string.charCodeAt(index)
        }
        var getElement
        if (value instanceof Uint8Array) {
          getElement = getTAElement
        } else if (value instanceof Uint8ClampedArray) {
          getElement = getTAElement
        } else if (value instanceof Int8Array) {
          getElement = getTAElement
        } else if (typeof value === 'string') {
          getElement = getStringElement
        } else {
          throwBindingError('Cannot pass non-string to std::string')
        }
        var length = value.length
        var ptr = _malloc(4 + length)
        HEAPU32[ptr >> 2] = length
        for (var i = 0; i < length; ++i) {
          var charCode = getElement(value, i)
          if (charCode > 255) {
            _free(ptr)
            throwBindingError('String has UTF-16 code units that do not fit in 8 bits')
          }
          HEAPU8[ptr + 4 + i] = charCode
        }
        if (destructors !== null) {
          destructors.push(_free, ptr)
        }
        return ptr
      },
      argPackAdvance: 8,
      readValueFromPointer: simpleReadValueFromPointer,
      destructorFunction: function (ptr) {
        _free(ptr)
      },
    })
  }
  function __embind_register_std_wstring(rawType, charSize, name) {
    name = readLatin1String(name)
    var getHeap, shift
    if (charSize === 2) {
      getHeap = function () {
        return HEAPU16
      }
      shift = 1
    } else if (charSize === 4) {
      getHeap = function () {
        return HEAPU32
      }
      shift = 2
    }
    registerType(rawType, {
      name: name,
      fromWireType: function (value) {
        var HEAP = getHeap()
        var length = HEAPU32[value >> 2]
        var a = new Array(length)
        var start = (value + 4) >> shift
        for (var i = 0; i < length; ++i) {
          a[i] = String.fromCharCode(HEAP[start + i])
        }
        _free(value)
        return a.join('')
      },
      toWireType: function (destructors, value) {
        var HEAP = getHeap()
        var length = value.length
        var ptr = _malloc(4 + length * charSize)
        HEAPU32[ptr >> 2] = length
        var start = (ptr + 4) >> shift
        for (var i = 0; i < length; ++i) {
          HEAP[start + i] = value.charCodeAt(i)
        }
        if (destructors !== null) {
          destructors.push(_free, ptr)
        }
        return ptr
      },
      argPackAdvance: 8,
      readValueFromPointer: simpleReadValueFromPointer,
      destructorFunction: function (ptr) {
        _free(ptr)
      },
    })
  }
  function __embind_register_value_object(
    rawType,
    name,
    constructorSignature,
    rawConstructor,
    destructorSignature,
    rawDestructor
  ) {
    structRegistrations[rawType] = {
      name: readLatin1String(name),
      rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
      rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
      fields: [],
    }
  }
  function __embind_register_value_object_field(
    structType,
    fieldName,
    getterReturnType,
    getterSignature,
    getter,
    getterContext,
    setterArgumentType,
    setterSignature,
    setter,
    setterContext
  ) {
    structRegistrations[structType].fields.push({
      fieldName: readLatin1String(fieldName),
      getterReturnType: getterReturnType,
      getter: embind__requireFunction(getterSignature, getter),
      getterContext: getterContext,
      setterArgumentType: setterArgumentType,
      setter: embind__requireFunction(setterSignature, setter),
      setterContext: setterContext,
    })
  }
  function __embind_register_void(rawType, name) {
    name = readLatin1String(name)
    registerType(rawType, {
      isVoid: true,
      name: name,
      argPackAdvance: 0,
      fromWireType: function () {
        return undefined
      },
      toWireType: function (destructors, o) {
        return undefined
      },
    })
  }
  function _abort() {
    Module['abort']()
  }
  var _environ = STATICTOP
  STATICTOP += 16
  function ___buildEnvironment(env) {
    var MAX_ENV_VALUES = 64
    var TOTAL_ENV_SIZE = 1024
    var poolPtr
    var envPtr
    if (!___buildEnvironment.called) {
      ___buildEnvironment.called = true
      ENV['USER'] = ENV['LOGNAME'] = 'web_user'
      ENV['PATH'] = '/'
      ENV['PWD'] = '/'
      ENV['HOME'] = '/home/web_user'
      ENV['LANG'] = 'C.UTF-8'
      ENV['_'] = Module['thisProgram']
      poolPtr = staticAlloc(TOTAL_ENV_SIZE)
      envPtr = staticAlloc(MAX_ENV_VALUES * 4)
      HEAP32[envPtr >> 2] = poolPtr
      HEAP32[_environ >> 2] = envPtr
    } else {
      envPtr = HEAP32[_environ >> 2]
      poolPtr = HEAP32[envPtr >> 2]
    }
    var strings = []
    var totalSize = 0
    for (var key in env) {
      if (typeof env[key] === 'string') {
        var line = key + '=' + env[key]
        strings.push(line)
        totalSize += line.length
      }
    }
    if (totalSize > TOTAL_ENV_SIZE) {
      throw new Error('Environment size exceeded TOTAL_ENV_SIZE!')
    }
    var ptrSize = 4
    for (var i = 0; i < strings.length; i++) {
      var line = strings[i]
      writeAsciiToMemory(line, poolPtr)
      HEAP32[(envPtr + i * ptrSize) >> 2] = poolPtr
      poolPtr += line.length + 1
    }
    HEAP32[(envPtr + strings.length * ptrSize) >> 2] = 0
  }
  var ENV = {}
  function _getenv(name) {
    if (name === 0) return 0
    name = Pointer_stringify(name)
    if (!ENV.hasOwnProperty(name)) return 0
    if (_getenv.ret) _free(_getenv.ret)
    _getenv.ret = allocateUTF8(ENV[name])
    return _getenv.ret
  }
  function _getgrnam() {
    Module['printErr']('missing function: getgrnam')
    abort(-1)
  }
  function _getpwnam() {
    throw 'getpwnam: TODO'
  }
  function _jsClose() {
    return jsAPI.close.apply(null, arguments)
  }
  function _jsCreate(filename) {
    return jsAPI.create.call(null, UTF32ToString(filename))
  }
  function _jsOpen(filename) {
    return jsAPI.open.call(null, UTF32ToString(filename))
  }
  function _jsRead() {
    return jsAPI.read.apply(null, arguments)
  }
  function _jsSeek(fd, offset, method) {
    return jsAPI.seek.call(null, fd, offset, UTF8ToString(method))
  }
  function _jsTell() {
    return jsAPI.tell.apply(null, arguments)
  }
  function _jsWrite() {
    return jsAPI.write.apply(null, arguments)
  }
  function _llvm_eh_typeid_for(type) {
    return type
  }
  var ___tm_current = STATICTOP
  STATICTOP += 48
  var ___tm_timezone = allocate(intArrayFromString('GMT'), 'i8', ALLOC_STATIC)
  var _tzname = STATICTOP
  STATICTOP += 16
  var _daylight = STATICTOP
  STATICTOP += 16
  var _timezone = STATICTOP
  STATICTOP += 16
  function _tzset() {
    if (_tzset.called) return
    _tzset.called = true
    HEAP32[_timezone >> 2] = new Date().getTimezoneOffset() * 60
    var winter = new Date(2e3, 0, 1)
    var summer = new Date(2e3, 6, 1)
    HEAP32[_daylight >> 2] = Number(winter.getTimezoneOffset() != summer.getTimezoneOffset())
    function extractZone(date) {
      var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
      return match ? match[1] : 'GMT'
    }
    var winterName = extractZone(winter)
    var summerName = extractZone(summer)
    var winterNamePtr = allocate(intArrayFromString(winterName), 'i8', ALLOC_NORMAL)
    var summerNamePtr = allocate(intArrayFromString(summerName), 'i8', ALLOC_NORMAL)
    if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
      HEAP32[_tzname >> 2] = winterNamePtr
      HEAP32[(_tzname + 4) >> 2] = summerNamePtr
    } else {
      HEAP32[_tzname >> 2] = summerNamePtr
      HEAP32[(_tzname + 4) >> 2] = winterNamePtr
    }
  }
  function _localtime_r(time, tmPtr) {
    _tzset()
    var date = new Date(HEAP32[time >> 2] * 1e3)
    HEAP32[tmPtr >> 2] = date.getSeconds()
    HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
    HEAP32[(tmPtr + 8) >> 2] = date.getHours()
    HEAP32[(tmPtr + 12) >> 2] = date.getDate()
    HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
    HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
    HEAP32[(tmPtr + 24) >> 2] = date.getDay()
    var start = new Date(date.getFullYear(), 0, 1)
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
    HEAP32[(tmPtr + 28) >> 2] = yday
    HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
    var summerOffset = new Date(2e3, 6, 1).getTimezoneOffset()
    var winterOffset = start.getTimezoneOffset()
    var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
    HEAP32[(tmPtr + 32) >> 2] = dst
    var zonePtr = HEAP32[(_tzname + (dst ? 4 : 0)) >> 2]
    HEAP32[(tmPtr + 40) >> 2] = zonePtr
    return tmPtr
  }
  function _localtime(time) {
    return _localtime_r(time, ___tm_current)
  }
  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest)
    return dest
  }
  function _mktime(tmPtr) {
    _tzset()
    var date = new Date(
      HEAP32[(tmPtr + 20) >> 2] + 1900,
      HEAP32[(tmPtr + 16) >> 2],
      HEAP32[(tmPtr + 12) >> 2],
      HEAP32[(tmPtr + 8) >> 2],
      HEAP32[(tmPtr + 4) >> 2],
      HEAP32[tmPtr >> 2],
      0
    )
    var dst = HEAP32[(tmPtr + 32) >> 2]
    var guessedOffset = date.getTimezoneOffset()
    var start = new Date(date.getFullYear(), 0, 1)
    var summerOffset = new Date(2e3, 6, 1).getTimezoneOffset()
    var winterOffset = start.getTimezoneOffset()
    var dstOffset = Math.min(winterOffset, summerOffset)
    if (dst < 0) {
      HEAP32[(tmPtr + 32) >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset)
    } else if (dst > 0 != (dstOffset == guessedOffset)) {
      var nonDstOffset = Math.max(winterOffset, summerOffset)
      var trueOffset = dst > 0 ? dstOffset : nonDstOffset
      date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4)
    }
    HEAP32[(tmPtr + 24) >> 2] = date.getDay()
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
    HEAP32[(tmPtr + 28) >> 2] = yday
    return (date.getTime() / 1e3) | 0
  }
  var PTHREAD_SPECIFIC = {}
  function _pthread_getspecific(key) {
    return PTHREAD_SPECIFIC[key] || 0
  }
  var PTHREAD_SPECIFIC_NEXT_KEY = 1
  function _pthread_key_create(key, destructor) {
    if (key == 0) {
      return ERRNO_CODES.EINVAL
    }
    HEAP32[key >> 2] = PTHREAD_SPECIFIC_NEXT_KEY
    PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY] = 0
    PTHREAD_SPECIFIC_NEXT_KEY++
    return 0
  }
  function _pthread_once(ptr, func) {
    if (!_pthread_once.seen) _pthread_once.seen = {}
    if (ptr in _pthread_once.seen) return
    Module['dynCall_v'](func)
    _pthread_once.seen[ptr] = 1
  }
  function _pthread_setspecific(key, value) {
    if (!(key in PTHREAD_SPECIFIC)) {
      return ERRNO_CODES.EINVAL
    }
    PTHREAD_SPECIFIC[key] = value
    return 0
  }
  function _time(ptr) {
    var ret = (Date.now() / 1e3) | 0
    if (ptr) {
      HEAP32[ptr >> 2] = ret
    }
    return ret
  }
  FS.staticInit()
  __ATINIT__.unshift(function () {
    if (!Module['noFSInit'] && !FS.init.initialized) FS.init()
  })
  __ATMAIN__.push(function () {
    FS.ignorePermissions = false
  })
  __ATEXIT__.push(function () {
    FS.quit()
  })
  __ATINIT__.unshift(function () {
    TTY.init()
  })
  __ATEXIT__.push(function () {
    TTY.shutdown()
  })
  InternalError = Module['InternalError'] = extendError(Error, 'InternalError')
  embind_init_charCodes()
  BindingError = Module['BindingError'] = extendError(Error, 'BindingError')
  init_ClassHandle()
  init_RegisteredPointer()
  init_embind()
  UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError')
  init_emval()
  ___buildEnvironment(ENV)
  DYNAMICTOP_PTR = staticAlloc(4)
  STACK_BASE = STACKTOP = alignMemory(STATICTOP)
  STACK_MAX = STACK_BASE + TOTAL_STACK
  DYNAMIC_BASE = alignMemory(STACK_MAX)
  HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE
  staticSealed = true
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
    var u8array = new Array(len)
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
    if (dontAddNull) u8array.length = numBytesWritten
    return u8array
  }
  Module['wasmTableSize'] = 316
  Module['wasmMaxTableSize'] = 316
  function invoke_i(index) {
    try {
      return Module['dynCall_i'](index)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_ii(index, a1) {
    try {
      return Module['dynCall_ii'](index, a1)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_iii(index, a1, a2) {
    try {
      return Module['dynCall_iii'](index, a1, a2)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_iiii(index, a1, a2, a3) {
    try {
      return Module['dynCall_iiii'](index, a1, a2, a3)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_iiiii(index, a1, a2, a3, a4) {
    try {
      return Module['dynCall_iiiii'](index, a1, a2, a3, a4)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
    try {
      return Module['dynCall_iiiiiii'](index, a1, a2, a3, a4, a5, a6)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    try {
      return Module['dynCall_iiiiiiiiii'](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_iiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    try {
      return Module['dynCall_iiiiiijii'](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_ijj(index, a1, a2, a3, a4) {
    try {
      return Module['dynCall_ijj'](index, a1, a2, a3, a4)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_ji(index, a1) {
    try {
      return Module['dynCall_ji'](index, a1)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_v(index) {
    try {
      Module['dynCall_v'](index)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_vi(index, a1) {
    try {
      Module['dynCall_vi'](index, a1)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_vii(index, a1, a2) {
    try {
      Module['dynCall_vii'](index, a1, a2)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viii(index, a1, a2, a3) {
    try {
      Module['dynCall_viii'](index, a1, a2, a3)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viiii(index, a1, a2, a3, a4) {
    try {
      Module['dynCall_viiii'](index, a1, a2, a3, a4)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viiiii(index, a1, a2, a3, a4, a5) {
    try {
      Module['dynCall_viiiii'](index, a1, a2, a3, a4, a5)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
    try {
      Module['dynCall_viiiiii'](index, a1, a2, a3, a4, a5, a6)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    try {
      Module['dynCall_viiiiiiiii'](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    try {
      Module['dynCall_viiiiiiiiii'](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_vij(index, a1, a2, a3) {
    try {
      Module['dynCall_vij'](index, a1, a2, a3)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  function invoke_viji(index, a1, a2, a3, a4) {
    try {
      Module['dynCall_viji'](index, a1, a2, a3, a4)
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e
      Module['setThrew'](1, 0)
    }
  }
  Module.asmGlobalArg = {}
  Module.asmLibraryArg = {
    abort: abort,
    enlargeMemory: enlargeMemory,
    getTotalMemory: getTotalMemory,
    abortOnCannotGrowMemory: abortOnCannotGrowMemory,
    invoke_i: invoke_i,
    invoke_ii: invoke_ii,
    invoke_iii: invoke_iii,
    invoke_iiii: invoke_iiii,
    invoke_iiiii: invoke_iiiii,
    invoke_iiiiiii: invoke_iiiiiii,
    invoke_iiiiiiiiii: invoke_iiiiiiiiii,
    invoke_iiiiiijii: invoke_iiiiiijii,
    invoke_ijj: invoke_ijj,
    invoke_ji: invoke_ji,
    invoke_v: invoke_v,
    invoke_vi: invoke_vi,
    invoke_vii: invoke_vii,
    invoke_viii: invoke_viii,
    invoke_viiii: invoke_viiii,
    invoke_viiiii: invoke_viiiii,
    invoke_viiiiii: invoke_viiiiii,
    invoke_viiiiiiiii: invoke_viiiiiiiii,
    invoke_viiiiiiiiii: invoke_viiiiiiiiii,
    invoke_vij: invoke_vij,
    invoke_viji: invoke_viji,
    ___cxa_allocate_exception: ___cxa_allocate_exception,
    ___cxa_begin_catch: ___cxa_begin_catch,
    ___cxa_end_catch: ___cxa_end_catch,
    ___cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
    ___cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
    ___cxa_find_matching_catch_4: ___cxa_find_matching_catch_4,
    ___cxa_free_exception: ___cxa_free_exception,
    ___cxa_throw: ___cxa_throw,
    ___lock: ___lock,
    ___map_file: ___map_file,
    ___resumeException: ___resumeException,
    ___setErrNo: ___setErrNo,
    ___syscall140: ___syscall140,
    ___syscall145: ___syscall145,
    ___syscall146: ___syscall146,
    ___syscall183: ___syscall183,
    ___syscall198: ___syscall198,
    ___syscall20: ___syscall20,
    ___syscall6: ___syscall6,
    ___syscall60: ___syscall60,
    ___syscall83: ___syscall83,
    ___syscall91: ___syscall91,
    ___unlock: ___unlock,
    __embind_finalize_value_object: __embind_finalize_value_object,
    __embind_register_bool: __embind_register_bool,
    __embind_register_class: __embind_register_class,
    __embind_register_class_constructor: __embind_register_class_constructor,
    __embind_register_class_function: __embind_register_class_function,
    __embind_register_emval: __embind_register_emval,
    __embind_register_float: __embind_register_float,
    __embind_register_integer: __embind_register_integer,
    __embind_register_memory_view: __embind_register_memory_view,
    __embind_register_std_string: __embind_register_std_string,
    __embind_register_std_wstring: __embind_register_std_wstring,
    __embind_register_value_object: __embind_register_value_object,
    __embind_register_value_object_field: __embind_register_value_object_field,
    __embind_register_void: __embind_register_void,
    _abort: _abort,
    _emscripten_memcpy_big: _emscripten_memcpy_big,
    _getenv: _getenv,
    _getgrnam: _getgrnam,
    _getpwnam: _getpwnam,
    _jsClose: _jsClose,
    _jsCreate: _jsCreate,
    _jsOpen: _jsOpen,
    _jsRead: _jsRead,
    _jsSeek: _jsSeek,
    _jsTell: _jsTell,
    _jsWrite: _jsWrite,
    _llvm_eh_typeid_for: _llvm_eh_typeid_for,
    _localtime: _localtime,
    _mktime: _mktime,
    _pthread_getspecific: _pthread_getspecific,
    _pthread_key_create: _pthread_key_create,
    _pthread_once: _pthread_once,
    _pthread_setspecific: _pthread_setspecific,
    _time: _time,
    DYNAMICTOP_PTR: DYNAMICTOP_PTR,
    STACKTOP: STACKTOP,
  }
  var asm = Module['asm'](Module.asmGlobalArg, Module.asmLibraryArg, buffer)
  Module['asm'] = asm
  var __GLOBAL__sub_I_bind_cpp = (Module['__GLOBAL__sub_I_bind_cpp'] = function () {
    return Module['asm']['__GLOBAL__sub_I_bind_cpp'].apply(null, arguments)
  })
  var __GLOBAL__sub_I_bridge_cpp = (Module['__GLOBAL__sub_I_bridge_cpp'] = function () {
    return Module['asm']['__GLOBAL__sub_I_bridge_cpp'].apply(null, arguments)
  })
  var __GLOBAL__sub_I_crc_cpp = (Module['__GLOBAL__sub_I_crc_cpp'] = function () {
    return Module['asm']['__GLOBAL__sub_I_crc_cpp'].apply(null, arguments)
  })
  var __GLOBAL__sub_I_global_cpp = (Module['__GLOBAL__sub_I_global_cpp'] = function () {
    return Module['asm']['__GLOBAL__sub_I_global_cpp'].apply(null, arguments)
  })
  var ___cxa_can_catch = (Module['___cxa_can_catch'] = function () {
    return Module['asm']['___cxa_can_catch'].apply(null, arguments)
  })
  var ___cxa_is_pointer_type = (Module['___cxa_is_pointer_type'] = function () {
    return Module['asm']['___cxa_is_pointer_type'].apply(null, arguments)
  })
  var ___errno_location = (Module['___errno_location'] = function () {
    return Module['asm']['___errno_location'].apply(null, arguments)
  })
  var ___getTypeName = (Module['___getTypeName'] = function () {
    return Module['asm']['___getTypeName'].apply(null, arguments)
  })
  var _emscripten_replace_memory = (Module['_emscripten_replace_memory'] = function () {
    return Module['asm']['_emscripten_replace_memory'].apply(null, arguments)
  })
  var _free = (Module['_free'] = function () {
    return Module['asm']['_free'].apply(null, arguments)
  })
  var _malloc = (Module['_malloc'] = function () {
    return Module['asm']['_malloc'].apply(null, arguments)
  })
  var setTempRet0 = (Module['setTempRet0'] = function () {
    return Module['asm']['setTempRet0'].apply(null, arguments)
  })
  var setThrew = (Module['setThrew'] = function () {
    return Module['asm']['setThrew'].apply(null, arguments)
  })
  var stackAlloc = (Module['stackAlloc'] = function () {
    return Module['asm']['stackAlloc'].apply(null, arguments)
  })
  var dynCall_dii = (Module['dynCall_dii'] = function () {
    return Module['asm']['dynCall_dii'].apply(null, arguments)
  })
  var dynCall_i = (Module['dynCall_i'] = function () {
    return Module['asm']['dynCall_i'].apply(null, arguments)
  })
  var dynCall_ii = (Module['dynCall_ii'] = function () {
    return Module['asm']['dynCall_ii'].apply(null, arguments)
  })
  var dynCall_iii = (Module['dynCall_iii'] = function () {
    return Module['asm']['dynCall_iii'].apply(null, arguments)
  })
  var dynCall_iiii = (Module['dynCall_iiii'] = function () {
    return Module['asm']['dynCall_iiii'].apply(null, arguments)
  })
  var dynCall_iiiii = (Module['dynCall_iiiii'] = function () {
    return Module['asm']['dynCall_iiiii'].apply(null, arguments)
  })
  var dynCall_iiiiii = (Module['dynCall_iiiiii'] = function () {
    return Module['asm']['dynCall_iiiiii'].apply(null, arguments)
  })
  var dynCall_iiiiiii = (Module['dynCall_iiiiiii'] = function () {
    return Module['asm']['dynCall_iiiiiii'].apply(null, arguments)
  })
  var dynCall_iiiiiiiiii = (Module['dynCall_iiiiiiiiii'] = function () {
    return Module['asm']['dynCall_iiiiiiiiii'].apply(null, arguments)
  })
  var dynCall_iiiiiijii = (Module['dynCall_iiiiiijii'] = function () {
    return Module['asm']['dynCall_iiiiiijii'].apply(null, arguments)
  })
  var dynCall_ijj = (Module['dynCall_ijj'] = function () {
    return Module['asm']['dynCall_ijj'].apply(null, arguments)
  })
  var dynCall_ji = (Module['dynCall_ji'] = function () {
    return Module['asm']['dynCall_ji'].apply(null, arguments)
  })
  var dynCall_v = (Module['dynCall_v'] = function () {
    return Module['asm']['dynCall_v'].apply(null, arguments)
  })
  var dynCall_vi = (Module['dynCall_vi'] = function () {
    return Module['asm']['dynCall_vi'].apply(null, arguments)
  })
  var dynCall_vii = (Module['dynCall_vii'] = function () {
    return Module['asm']['dynCall_vii'].apply(null, arguments)
  })
  var dynCall_viid = (Module['dynCall_viid'] = function () {
    return Module['asm']['dynCall_viid'].apply(null, arguments)
  })
  var dynCall_viii = (Module['dynCall_viii'] = function () {
    return Module['asm']['dynCall_viii'].apply(null, arguments)
  })
  var dynCall_viiii = (Module['dynCall_viiii'] = function () {
    return Module['asm']['dynCall_viiii'].apply(null, arguments)
  })
  var dynCall_viiiii = (Module['dynCall_viiiii'] = function () {
    return Module['asm']['dynCall_viiiii'].apply(null, arguments)
  })
  var dynCall_viiiiii = (Module['dynCall_viiiiii'] = function () {
    return Module['asm']['dynCall_viiiiii'].apply(null, arguments)
  })
  var dynCall_viiiiiiiii = (Module['dynCall_viiiiiiiii'] = function () {
    return Module['asm']['dynCall_viiiiiiiii'].apply(null, arguments)
  })
  var dynCall_viiiiiiiiii = (Module['dynCall_viiiiiiiiii'] = function () {
    return Module['asm']['dynCall_viiiiiiiiii'].apply(null, arguments)
  })
  var dynCall_vij = (Module['dynCall_vij'] = function () {
    return Module['asm']['dynCall_vij'].apply(null, arguments)
  })
  var dynCall_viji = (Module['dynCall_viji'] = function () {
    return Module['asm']['dynCall_viji'].apply(null, arguments)
  })
  Module['asm'] = asm
  function ExitStatus(status) {
    this.name = 'ExitStatus'
    this.message = 'Program terminated with exit(' + status + ')'
    this.status = status
  }
  ExitStatus.prototype = new Error()
  ExitStatus.prototype.constructor = ExitStatus
  var initialStackTop
  dependenciesFulfilled = function runCaller() {
    if (!Module['calledRun']) run()
    if (!Module['calledRun']) dependenciesFulfilled = runCaller
  }
  function run(args) {
    args = args || Module['arguments']
    if (runDependencies > 0) {
      return
    }
    preRun()
    if (runDependencies > 0) return
    if (Module['calledRun']) return
    function doRun() {
      if (Module['calledRun']) return
      Module['calledRun'] = true
      if (ABORT) return
      ensureInitRuntime()
      preMain()
      if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']()
      postRun()
    }
    if (Module['setStatus']) {
      Module['setStatus']('Running...')
      setTimeout(function () {
        setTimeout(function () {
          Module['setStatus']('')
        }, 1)
        doRun()
      }, 1)
    } else {
      doRun()
    }
  }
  Module['run'] = run
  function exit(status, implicit) {
    if (implicit && Module['noExitRuntime'] && status === 0) {
      return
    }
    if (Module['noExitRuntime']) {
    } else {
      ABORT = true
      EXITSTATUS = status
      STACKTOP = initialStackTop
      exitRuntime()
      if (Module['onExit']) Module['onExit'](status)
    }
    if (ENVIRONMENT_IS_NODE) {
      process['exit'](status)
    }
    Module['quit'](status, new ExitStatus(status))
  }
  Module['exit'] = exit
  function abort(what) {
    if (Module['onAbort']) {
      Module['onAbort'](what)
    }
    if (what !== undefined) {
      Module.print(what)
      Module.printErr(what)
      what = JSON.stringify(what)
    } else {
      what = ''
    }
    ABORT = true
    EXITSTATUS = 1
    throw 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.'
  }
  Module['abort'] = abort
  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']]
    while (Module['preInit'].length > 0) {
      Module['preInit'].pop()()
    }
  }
  Module['noExitRuntime'] = true
  run()

  return unpack
}
//-------------------------------------------------------------

/**
 * Returns a Promise containing the rar extractor for the given filename.
 * @private
 */
function getExtractor(url) {
  return fetch(new Request(url))
    .then((response) => {
      if (response.ok) return response.arrayBuffer()
      else {
        throw new Error('404 Error: File not found.')
      }
    })
    .then((buffer) => unpackBridge.createExtractorFromData(buffer))
}

/**
 *  Returns a string representing the formatted contents of the given file.
 * @private
 */
function extract({ resourceId, url }) {
  return new Promise(function (resolve, reject) {
    if (!unpackBridge) {
      throw new Error('unpackBridge not detected')
    }
    if (!unpack) {
      throw new Error('unpack not detected')
    }

    getExtractor(url).then(
      (extractor) => {
        // return extractor.extractAll();
        resolve(extractor.extractAll())
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/**
 * Listen for messages sent to the worker.
 * @private
 */
function handleMessage(data, postMessage) {
  if (data.type == 'init') {
    unpack = initunpack(data.buffer)
    unpack.onRuntimeInitialized = () => {
      postMessage({ type: 'WASM_LOADED' })
    }
  } else if (data.type == 'fetch') {
    extract(data).then(
      (unpacked) => {
        returnData(data, unpacked, postMessage)
      },
      (err) => {
        const result = {
          taskId: data.taskId,
          type: 'ERROR',
          resourceId: data.resourceId,
          url: data.url,
        }
        postMessage(result)
      }
    )
  } else if (data.type == 'unpack') {
    const { buffer } = data

    if (!unpackBridge) {
      throw new Error('unpackBridge not detected')
    }
    if (!unpack) {
      throw new Error('unpack not detected')
    }

    const extractor = unpackBridge.createExtractorFromData(buffer)
    const unpacked = extractor.extractAll()
    returnData(data, unpacked, postMessage)
  }
}

function returnData(data, unpacked, postMessage) {
  const [state, list] = unpacked
  if (state.state == 'FAIL') {
    const result = {
      taskId: data.taskId,
      type: 'ERROR',
      reason: state.reason,
      msg: state.msg,
      resourceId: data.resourceId,
      url: data.url,
    }
    postMessage(result)
    return
  }
  const result = {
    taskId: data.taskId,
    type: 'FINISHED',
    resourceId: data.resourceId,
    entries: {},
  }

  const transferables = []
  if (list && list.files) {
    for (const file of list.files) {
      result.entries[file.fileHeader.name] = file.extract[1]
      transferables.push(file.extract[1].buffer)
    }
  }
  postMessage(result, transferables)
}

/* NODE_START
export { handleMessage }
// NODE_ELSE */
onmessage = function (event) {
  handleMessage(event.data, self.postMessage)
}
// NODE_END
/**
 * When the WASM runtime has been initialized on the unpack.js module, send a message indicating
 * that the library is ready.
 */
// <!-- prettier-ignore-end -->
