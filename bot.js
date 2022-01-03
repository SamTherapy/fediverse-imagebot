import 'command-line-args';
import 'command-line-usage';


const optionDefinitions = [
  { name: "help", type: Boolean, alias: 'help' },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number }
]
const args = commandLineArgs(optionDefinitions)

if (args.help) {

  return 0;
}
